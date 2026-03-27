import uuid

from app.extensions import db
from app.models.booking import Booking, BookingSeat
from app.models.event import Event
from app.models.seat import Seat
from app.services.seat_service import expire_event_holds
from app.utils.pricing import calculate_totals


def _begin_immediate():
    db.session.connection().exec_driver_sql("BEGIN IMMEDIATE")


def build_booking_preview(event_id, hold_token):
    event = Event.query.get(event_id)
    if not event:
        raise LookupError("Event not found")

    expire_event_holds(event_id)
    db.session.commit()

    seats = (
        Seat.query.filter_by(
            event_id=event_id,
            hold_token=hold_token,
            status="held",
        )
        .order_by(Seat.row_label.asc(), Seat.seat_number.asc())
        .all()
    )

    if not seats:
        raise LookupError("No active seat hold found")

    totals = calculate_totals(price=event.price, quantity=len(seats))

    return {
        "event_id": event.id,
        "hold_token": hold_token,
        "currency": "USD",
        "seat_count": len(seats),
        "seats": [seat.to_dict() for seat in seats],
        **totals,
    }


def confirm_booking(user_id, event_id, hold_token):
    _begin_immediate()

    event = Event.query.get(event_id)
    if not event:
        raise LookupError("Event not found")

    expire_event_holds(event_id)
    db.session.flush()

    seats = (
        Seat.query.filter_by(
            event_id=event_id,
            hold_token=hold_token,
            status="held",
        )
        .order_by(Seat.row_label.asc(), Seat.seat_number.asc())
        .all()
    )

    if not seats:
        raise RuntimeError("Seat hold expired or is invalid")

    totals = calculate_totals(price=event.price, quantity=len(seats))

    booking = Booking(
        user_id=user_id,
        event_id=event_id,
        booking_ref=f"BIN-{uuid.uuid4().hex[:10].upper()}",
        status="confirmed",
        payment_status="paid",
        subtotal=totals["subtotal"],
        fees=totals["fees"],
        taxes=totals["taxes"],
        total_amount=totals["total_amount"],
    )
    db.session.add(booking)
    db.session.flush()

    for seat in seats:
        db.session.add(
            BookingSeat(
                booking_id=booking.id,
                seat_id=seat.id,
                price_at_booking=event.price,
            )
        )
        seat.status = "booked"
        seat.hold_token = None
        seat.hold_expires_at = None

    db.session.commit()
    return booking


def get_user_bookings(user_id):
    bookings = (
        Booking.query.filter_by(user_id=user_id)
        .order_by(Booking.created_at.desc())
        .all()
    )
    return bookings


def get_user_booking_detail(user_id, booking_id):
    booking = Booking.query.filter_by(id=booking_id, user_id=user_id).first()
    return booking
