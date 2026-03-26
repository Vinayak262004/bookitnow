from flask import Blueprint, jsonify
from flask_jwt_extended import get_jwt_identity
from app.services.event_service import get_organizer_events
from app.utils.decorators import role_required

organizer_bp = Blueprint("organizer", __name__)

@organizer_bp.get("/events")
@role_required("organizer")
def organizer_events():
    organizer_id = int(get_jwt_identity())
    events = get_organizer_events(organizer_id)
    return jsonify({
        "events": events,
        "stats": {
            "total_events": len(events)
        }
    })
