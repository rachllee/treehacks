from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from flask_login import *
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from email_validator import validate_email, EmailNotValidError
from flask_cors import CORS, cross_origin

##import openai
import os
import re
import json 
## import os.openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///recipes.db"
CORS(app)

db = SQLAlchemy(app)
app.secret_key = 'secretkey'
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)


login_manager = LoginManager()

from models import *

login_manager.init_app(app)


@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    print('Received data:', data)
    parent_name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    try:
        validate_email(email)
    except EmailNotValidError:
        return jsonify({"Error": "Invalid email"}), 400
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    try:
        print('in try loop')
        new_parent = Parent(name=parent_name, email=email, password=hashed_password)
        db.session.add(new_parent)

        # assuming child_data is entered as a list of dictionaries
        child_data = data.get('children')
        print('before for loop')
        for child in child_data:
            print('child:', child)
            name = child.get('name')
            age = child.get('age')
            new_child = Child(name=name, age=age)
            db.session.add(new_child)

        print('before commit')
        try:
            print('Database URL:', app.config["SQLALCHEMY_DATABASE_URI"])
            db.session.commit()
        except Exception as e:
            print(f"commit failed with error:  {str(e)}")

        print('after commit')
        return jsonify({"message": "User registered!"})
    except Exception as e:
        return jsonify({"Error": str(e)}), 500

# login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = Parent.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        return jsonify({"message": "Logged in!"})
    return jsonify({"error": "Username or password invalid"})

# logout
@app.route("/logout", methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out!"})


# add recipe
@app.route("/addrecipe", methods=['POST'])
@login_required
def add_recipe():
    recipe_data = request.get_json()
    title = recipe_data.get('title')
    instructions = recipe_data.get('instructions')
    
    new_recipe = Recipe(title=title, instructions=instructions)
    db.session.add(new_recipe)
    db.session.commit()
    return jsonify({"message": "Recipe added!"})

# register additional children
@app.route('/register_child', methods=['POST'])
@login_required
def register_child():
    data = request.get_json()
    child_data = data.get('children')
    parent_id = current_user.id 
    
    try:
        for child in child_data:
            name = child.get('name')
            age = child.get('age')
            new_child = Child(name=name, age=age, parent_id=parent_id)
            db.session.add(new_child)
        db.session.commit()
        return jsonify({"message": "Registered successfully!"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500
    

# assign recipes to children
@app.route('/assign_recipe', methods=['POST'])
@login_required
def assign_recipe():
    data = request.get_json()
    recipe_id = data.get('recipe_id')
    children = data.get('child_ids') 

    try:
        recipe = Recipe.query.get(recipe_id)
        if not recipe:
            return jsonify({"Error": "Recipe not found"}), 404
        
        for child_id in children:
            child = Child.query.get(child_id)
            if not child:
                continue  
            recipe.children.append(child)
        
        db.session.commit()
        return jsonify({"message": "Recipe assigned to children successfully!"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500

# get recipes assigned to child
@app.route('/recipes', methods=['GET'])
@login_required
def list_recipes(child_id):
    recipes = Recipe.query.join(Recipe.children).filter(Child.id == child_id).distinct().all()
    recipe_data = [{'id': recipe.id, 'title': recipe.title, 'instructions': recipe.instructions} for recipe in recipes]
    return jsonify(recipe_data)

# get recipe
@app.route('/recipe/<int:recipe_id>', methods=['GET'])
@login_required
def get_recipe(recipe_id):
    recipe = Recipe.query.filter_by(id == recipe_id).first()
    if recipe:
        return jsonify({
            'id': recipe.id,
            'title': recipe.title,
            'instructions': recipe.instructions
        })
    else:
        return jsonify({'error': 'Recipe not found'}), 404


# list children of parent
@app.route('/children', methods=['GET'])
@login_required
def list_children():
    parent_id = current_user.id
    children = Child.query.filter_by(parent_id=parent_id).all()
    children_data = [{'id': child.id, 'name': child.name, 'age': child.age} for child in children]
    return jsonify(children_data)


# update child
@app.route('/update_child/<child_id>', methods=['PUT'])
@login_required
def update_child(child_id):
    child = Child.query.filter_by(id=child_id).first()
    new_data = request.get_json()

    try:
        if 'name' in new_data:
            child.name = new_data['name']
        if 'age' in new_data:
            child.age = new_data['age']
        db.session.commit()
        return jsonify({"message": "Profile edited successfully!"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500
    
# update recipe
@app.route('/update_recipe/<recipe_id>', methods=['PUT'])
@login_required
def update_recipe(recipe_id):
    recipe = Recipe.query.filter_by(id=recipe_id).first()
    new_data = request.get_json()

    try:
        if 'title' in new_data:
            recipe.title = new_data['title']
        if 'instructions' in new_data:
            recipe.instructions = new_data['instructions']
        db.session.commit()
        return jsonify({"message": "Recipe edited successfully!"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"Error": str(e)}), 500
    
# delete child
@app.route('/delete_child/<child_id>', methods=['DELETE'])
@login_required
def delete_child(child_id):
    if current_user.is_authenticated:
        child = Child.query.filter_by(id=child_id).first()
        if not child:
            return jsonify({"Error": 'Child not found'}), 400
        db.session.delete(child)
        db.session.commit()
        return jsonify({"message": "Child removed successfully"})
    return jsonify({"Error": 'Unauthorized'}), 401

# delete recipe
@app.route('/delete_recipe/<recipe_id>', methods=['DELETE'])
@login_required
def delete_recipe(recipe_id):
    if current_user.is_authenticated:
        recipe = Recipe.query.filter_by(id=recipe_id).first()
        if not recipe:
             return jsonify({"Error": 'Recipe not found'}), 400
        db.session.delete(recipe)
        db.session.commit()
        return jsonify({"message": "Recipe removed successfully"})
    return jsonify({"Error": 'Unauthorized'}), 401

if __name__ == '__main__':
    app.run(debug=True)

def split_steps_into_array(steps_string):
    # Regex pattern to match each step
    step_pattern = re.compile(r'\d+\): (.*?)(?:\n|$)')
    
    # Find all matches of the pattern in the steps_string
    matches = step_pattern.findall(steps_string)
    
    return matches
@app.route('/generate-image', methods=['POST'])
def generate_image():
    data = request.get_json()
    prompt = data.get('prompt')  
    print(prompt)
    response = openai.Image.create(
    model= "dall-e-3",
    prompt=prompt,
    n=1,
)

    print(response["data"][0]["url"])
    return response

@app.route('/simplify-recipe', methods=['POST'])
def simplify_recipe():
    data = request.get_json()
    text_to_prepend = data.get("text")
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": "You are a helpful AI Assistant helping users take a complex recipe and simplify into a numbered list of simple steps that a 2 year old can replicate"
                },
                {
                    "role": "user",
                    "content": text_to_prepend + 'From the above recipe, simplify and break down each step so that a 3 year old child can do it without any help and have fun. Each step should be atmost 5-10 words, and should be at most one thing to do. For instance, if the recipe says "Grab 3 cookie sheets and cover them with a parchment", one step should be "Grab cookie sheets" and the other should be "cover them with a special paper called parchment". Make sure to include measurements. Format the the list as follows, where i is the ith instruction.\n "i):" \n Separate each new instruction with a newline.` Keep each ith instruction as small as possible There will be images to go along with this.'
                },
            ],
            temperature=1,
            max_tokens=1109,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0
        )
        arr = response.choices[0].message.content.split("\n")
        filtered_steps_array = [step for step in arr if step.strip()]
        return filtered_steps_array

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)

