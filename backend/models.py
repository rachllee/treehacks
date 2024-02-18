from app import db
from flask_login import UserMixin
from app import login_manager
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

child_recipe = db.Table('child_recipe',
    db.Column('child_id', db.Integer, db.ForeignKey('child.id'), primary_key=True),
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id'), primary_key=True)
)

class Parent(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    children = db.relationship('Child', backref='parent', lazy=True)

class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('parent.id'), nullable=False)

class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    instructions = db.Column(db.Text, nullable=False)
    simplified = db.Column(db.Boolean, default=True, nullable=False)
    children = db.relationship('Child', secondary=child_recipe, backref=db.backref('recipes', lazy=True))

@login_manager.user_loader
def load_user(id):
    return Parent.query.get(int(id))

if __name__ == '__main__':
    db.create_all()
