from datetime import datetime

from app.extensions import db


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False, index=True)
    booking_ref = db.Column(db.String(32), nullable=False, unique=True, index=True)
    status = db.Column(db.String(20), nullable=False, default="confirmed", index=True)
    payment_status = db.Column(db.String(20), nullable=False, default="paid", index=True)
    subtotal = db.Column(db.Float, nullable=False)
    fees = db.Column(db.Float, nullable=False)
    taxes = db.Column(db.Float, nullable=False)
    total_amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship("User", backref=db.backref("bookings", lazy=True))
    event = db.relationship("Event", backref=db.backref("bookings", lazy=True))
    booking_seats = db.relationship(
        "BookingSeat",
        backref="booking",
        lazy=True,
        cascade="all, delete-orphan",
    )

    def to_dict(self, include_seats=False):
        data = {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "booking_ref": self.booking_ref,
            "status": self.status,
            "payment_status": self.payment_status,
            "subtotal": self.subtotal,
            "fees": self.fees,
            "taxes": self.taxes,
            "total_amount": self.total_amount,
            "created_at": self.created_at.isoformat(),
        }

        if include_seats:
            data["seats"] = [seat.to_dict() for seat in self.booking_seats]

        return data


class BookingSeat(db.Model):
    __tablename__ = "booking_seats"

    id = db.Column(db.Integer, primary_key=True)
    booking_id = db.Column(db.Integer, db.ForeignKey("bookings.id"), nullable=False, index=True)
    seat_id = db.Column(db.Integer, db.ForeignKey("seats.id"), nullable=False, index=True)
    price_at_booking = db.Column(db.Float, nullable=False)

    seat = db.relationship("Seat", backref=db.backref("booking_links", lazy=True))

    __table_args__ = (
        db.UniqueConstraint("booking_id", "seat_id", name="uq_booking_seat"),
    )

    def to_dict(self):
        return {
            "id": self.id,
            "booking_id": self.booking_id,
            "seat_id": self.seat_id,
            "price_at_booking": self.price_at_booking,
            "seat_label": self.seat.seat_label if self.seat else None,
            "row_label": self.seat.row_label if self.seat else None,
            "seat_number": self.seat.seat_number if self.seat else None,
        }
