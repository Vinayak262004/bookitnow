from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity, jwt_required
from app.services.auth_service import register_user, login_user, get_current_user
from app.utils.errors import error_response

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/register")
def register():
    data = request.get_json() or {}
    required = ["name", "email", "password", "role"]
    missing = [field for field in required if not data.get(field)]
    if missing:
        return error_response(f"Missing fields: {', '.join(missing)}", 400)

    try:
        result = register_user(data["name"], data["email"], data["password"], data["role"])
    except ValueError as exc:
        return error_response(str(exc), 400)

    return jsonify(result), 201

@auth_bp.post("/login")
def login():
    data = request.get_json() or {}
    required = ["email", "password"]
    missing = [field for field in required if not data.get(field)]
    if missing:
        return error_response(f"Missing fields: {', '.join(missing)}", 400)

    try:
        result = login_user(data["email"], data["password"])
    except ValueError as exc:
        return error_response(str(exc), 401)

    return jsonify(result)

@auth_bp.get("/me")
@jwt_required()
def me():
    user = get_current_user(get_jwt_identity())
    if not user:
        return error_response("User not found", 404)
    return jsonify({"user": user.to_dict()})
