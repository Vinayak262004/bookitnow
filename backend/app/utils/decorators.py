from functools import wraps
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.models.user import User
from app.utils.errors import error_response

def role_required(role):
    def decorator(fn):
        @wraps(fn)
        @jwt_required()
        def wrapper(*args, **kwargs):
            user = User.query.get(int(get_jwt_identity()))
            if not user:
                return error_response("User not found", 401)
            if user.role != role:
                return error_response("You do not have access to this resource", 403)
            return fn(*args, **kwargs)
        return wrapper
    return decorator
