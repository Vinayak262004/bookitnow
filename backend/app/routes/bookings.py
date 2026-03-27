from flask import Blueprint, jsonify, g, request

from app.services.booking_service import (
    build_booking_preview,
    confirm_booking,
    get_user_booking_detail,
    get_user_bookings,
)


bookings_bp = Blueprint("bookings", __name__)


def _require_current_user():
    user = getattr(g, "current_user", None)
    if user is None:
        return None, (jsonify({"message": "Authentication required"}), 401)
    return user, None


@bookings_bp.post("/bookings/preview")
def booking_preview():
    data = request.get_json(silent=True) or {}
    event_id = data.get("event_id")
    hold_token = data.get("hold_token")

    if not event_id or not hold_token:
        return jsonify({"message": "event_id and hold_token are required"}), 400

    try:
        preview = build_booking_preview(event_id=event_id, hold_token=hold_token)
    except LookupError as exc:
        return jsonify({"message": str(exc)}), 404

    return jsonify(preview), 200


@bookings_bp.post("/bookings/confirm")
def create_booking():
    user, error = _require_current_user()
    if error:
        return error

    data = request.get_json(silent=True) or {}
    event_id = data.get("event_id")
    hold_token = data.get("hold_token")

    if not event_id or not hold_token:
        return jsonify({"message": "event_id and hold_token are required"}), 400

    try:
        booking = confirm_booking(
            user_id=user.id,
            event_id=event_id,
            hold_token=hold_token,
        )
    except LookupError as exc:
        return jsonify({"message": str(exc)}), 404
    except RuntimeError as exc:
        return jsonify({"message": str(exc)}), 409

    return jsonify({"booking": booking.to_dict(include_seats=True)}), 201


@bookings_bp.get("/bookings/my")
def my_bookings():
    user, error = _require_current_user()
    if error:
        return error

    bookings = get_user_bookings(user.id)
    return jsonify(
        {"bookings": [booking.to_dict(include_seats=True) for booking in bookings]}
    ), 200


@bookings_bp.get("/bookings/<int:booking_id>")
def booking_detail(booking_id):
    user, error = _require_current_user()
    if error:
        return error

    booking = get_user_booking_detail(user.id, booking_id)
    if not booking:
        return jsonify({"message": "Booking not found"}), 404

    return jsonify({"booking": booking.to_dict(include_seats=True)}), 200
