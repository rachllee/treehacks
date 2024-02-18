"""Initial migration.

Revision ID: 54c018739fd9
Revises: 
Create Date: 2024-02-18 00:50:07.470581

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '54c018739fd9'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('parent',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    op.create_table('recipe',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('instructions', sa.Text(), nullable=False),
    sa.Column('simplified', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('child',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('parent_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['parent_id'], ['parent.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('child_recipe',
    sa.Column('child_id', sa.Integer(), nullable=False),
    sa.Column('recipe_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['child_id'], ['child.id'], ),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipe.id'], ),
    sa.PrimaryKeyConstraint('child_id', 'recipe_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('child_recipe')
    op.drop_table('child')
    op.drop_table('recipe')
    op.drop_table('parent')
    # ### end Alembic commands ###
