from flask import Blueprint, jsonify, request

from app.services.seat_service import get_event_seats, hold_seats, release_hold


seats_bp = Blueprint("seats", __name__)


@seats_bp.get("/events/<int:event_id>/seats")
def list_event_seats(event_id):
    event, seats = get_event_seats(event_id)

    if not event:
        return jsonify({"message": "Event not found"}), 404

    return jsonify(
        {
            "event_id": event.id,
            "seats": [seat.to_dict() for seat in seats],
        }
    ), 200


@seats_bp.post("/seats/hold")
def create_seat_hold():
    data = request.get_json(silent=True) or {}
    event_id = data.get("event_id")
    seat_ids = data.get("seat_ids") or []

    if not event_id:
        return jsonify({"message": "event_id is required"}), 400

    try:
        result = hold_seats(event_id=event_id, seat_ids=seat_ids)
    except ValueError as exc:
        return jsonify({"message": str(exc)}), 400
    except LookupError as exc:
        return jsonify({"message": str(exc)}), 404
    except RuntimeError as exc:
        return jsonify({"message": str(exc)}), 409

    return jsonify(
        {
            "hold_token": result["hold_token"],
            "hold_expires_at": result["hold_expires_at"].isoformat(),
            "event_id": result["event_id"],
            "seats": [seat.to_dict() for seat in result["seats"]],
        }
    ), 200


@seats_bp.delete("/seats/hold/<string:hold_token>")
def delete_seat_hold(hold_token):
    seats = release_hold(hold_token)

    return jsonify(
        {
            "hold_token": hold_token,
            "released_count": len(seats),
        }
    ), 200
