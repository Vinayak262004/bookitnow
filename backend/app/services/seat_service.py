from datetime import datetime, timedelta
import uuid

from flask import current_app

from app.extensions import db
from app.models.event import Event
from app.models.seat import Seat


def _begin_immediate():
    db.session.connection().exec_driver_sql("BEGIN IMMEDIATE")


def expire_event_holds(event_id):
    now = datetime.utcnow()

    expired_seats = (
        Seat.query.filter(
            Seat.event_id == event_id,
            Seat.status == "held",
            Seat.hold_expires_at.isnot(None),
            Seat.hold_expires_at <= now,
        ).all()
    )

    for seat in expired_seats:
        seat.status = "available"
        seat.hold_token = None
        seat.hold_expires_at = None

    return expired_seats


def get_event_seats(event_id):
    event = Event.query.get(event_id)
    if not event:
        return None, None

    expire_event_holds(event_id)
    db.session.commit()

    seats = (
        Seat.query.filter_by(event_id=event_id)
        .order_by(Seat.row_label.asc(), Seat.seat_number.asc())
        .all()
    )

    return event, seats


def hold_seats(event_id, seat_ids):
    if not seat_ids:
        raise ValueError("seat_ids is required")

    _begin_immediate()

    event = Event.query.get(event_id)
    if not event:
        raise LookupError("Event not found")

    expire_event_holds(event_id)
    db.session.flush()

    seats = (
        Seat.query.filter(
            Seat.event_id == event_id,
            Seat.id.in_(seat_ids),
        )
        .order_by(Seat.id.asc())
        .all()
    )

    if len(seats) != len(set(seat_ids)):
        raise LookupError("One or more seats were not found for this event")

    unavailable = [seat.seat_label for seat in seats if seat.status != "available"]
    if unavailable:
        raise RuntimeError(f"Seats unavailable: {', '.join(unavailable)}")

    hold_minutes = current_app.config.get("SEAT_HOLD_MINUTES", 5)
    hold_token = uuid.uuid4().hex
    hold_expires_at = datetime.utcnow() + timedelta(minutes=hold_minutes)

    for seat in seats:
        seat.status = "held"
        seat.hold_token = hold_token
        seat.hold_expires_at = hold_expires_at

    db.session.commit()

    return {
        "hold_token": hold_token,
        "hold_expires_at": hold_expires_at,
        "event_id": event_id,
        "seats": seats,
    }


def release_hold(hold_token):
    _begin_immediate()

    seats = Seat.query.filter_by(hold_token=hold_token).all()
    if not seats:
        db.session.commit()
        return []

    released = []
    for seat in seats:
        if seat.status == "held":
            seat.status = "available"
            seat.hold_token = None
            seat.hold_expires_at = None
            released.append(seat)

    db.session.commit()
    return released
