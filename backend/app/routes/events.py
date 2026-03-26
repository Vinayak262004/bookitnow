from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from app.services.event_service import list_published_events, get_event_by_id, create_event
from app.utils.decorators import role_required
from app.utils.errors import error_response

events_bp = Blueprint("events", __name__)

@events_bp.get("/events")
def list_events():
    return jsonify({"events": list_published_events()})

@events_bp.get("/events/<int:event_id>")
def get_event(event_id):
    event = get_event_by_id(event_id)
    if not event:
        return error_response("Event not found", 404)
    return jsonify({"event": event.to_dict()})

@events_bp.post("/events")
@role_required("organizer")
def create_new_event():
    data = request.get_json() or {}
    required = [
        "title", "description", "category", "venue_name",
        "location", "start_at", "price", "capacity"
    ]
    missing = [field for field in required if data.get(field) in (None, "")]
    if missing:
        return error_response(f"Missing fields: {', '.join(missing)}", 400)

    try:
        event = create_event(data, int(get_jwt_identity()))
    except ValueError as exc:
        return error_response(str(exc), 400)

    return jsonify({"event": event.to_dict()}), 201
