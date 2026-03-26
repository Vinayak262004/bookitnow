from flask_jwt_extended import create_access_token
from app.extensions import db
from app.models.user import User

VALID_ROLES = {"user", "organizer"}

def register_user(name, email, password, role):
    if role not in VALID_ROLES:
        raise ValueError("Invalid role")

    existing_user = User.query.filter_by(email=email.lower().strip()).first()
    if existing_user:
        raise ValueError("Email already registered")

    user = User(
        name=name.strip(),
        email=email.lower().strip(),
        role=role,
    )
    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return {
        "user": user.to_dict(),
        "access_token": create_access_token(identity=str(user.id)),
    }

def login_user(email, password):
    user = User.query.filter_by(email=email.lower().strip()).first()
    if not user or not user.check_password(password):
        raise ValueError("Invalid email or password")

    return {
        "user": user.to_dict(),
        "access_token": create_access_token(identity=str(user.id)),
    }

def get_current_user(user_id):
    return User.query.get(int(user_id))
