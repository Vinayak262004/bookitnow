from datetime import datetime
from app.extensions import db
from app.models.event import Event

VALID_EVENT_STATUSES = {"draft", "published", "cancelled"}

def list_published_events():
    events = Event.query.filter_by(status="published").order_by(Event.start_at.asc()).all()
    return [event.to_dict() for event in events]

def get_event_by_id(event_id):
    return Event.query.get(event_id)

def create_event(data, organizer_id):
    status = data.get("status", "draft")
    if status not in VALID_EVENT_STATUSES:
        raise ValueError("Invalid event status")

    try:
        start_at = datetime.fromisoformat(data["start_at"])
    except (KeyError, ValueError):
        raise ValueError("Invalid start_at value")

    event = Event(
        organizer_id=organizer_id,
        title=data["title"].strip(),
        description=data["description"].strip(),
        category=data["category"].strip(),
        venue_name=data["venue_name"].strip(),
        location=data["location"].strip(),
        start_at=start_at,
        image_url=data.get("image_url"),
        price=float(data["price"]),
        capacity=int(data["capacity"]),
        status=status,
    )

    db.session.add(event)
    db.session.commit()
    return event

def get_organizer_events(organizer_id):
    events = Event.query.filter_by(organizer_id=organizer_id).order_by(Event.created_at.desc()).all()
    return [event.to_dict() for event in events]
