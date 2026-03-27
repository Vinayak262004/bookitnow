from datetime import datetime

from app.extensions import db


class Seat(db.Model):
    __tablename__ = "seats"

    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"), nullable=False, index=True)
    seat_label = db.Column(db.String(20), nullable=False)
    row_label = db.Column(db.String(10), nullable=False)
    seat_number = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="available", index=True)
    hold_token = db.Column(db.String(64), nullable=True, index=True)
    hold_expires_at = db.Column(db.DateTime, nullable=True)

    event = db.relationship(
        "Event",
        backref=db.backref("seats", lazy=True, cascade="all, delete-orphan"),
    )

    __table_args__ = (
        db.UniqueConstraint("event_id", "seat_label", name="uq_seat_event_label"),
    )

    def is_hold_expired(self, now=None):
        now = now or datetime.utcnow()
        return bool(self.hold_expires_at and self.hold_expires_at <= now)

    def to_dict(self, include_hold_meta=False):
        data = {
            "id": self.id,
            "event_id": self.event_id,
            "seat_label": self.seat_label,
            "row_label": self.row_label,
            "seat_number": self.seat_number,
            "status": self.status,
        }
        if include_hold_meta:
            data["hold_token"] = self.hold_token
            data["hold_expires_at"] = (
                self.hold_expires_at.isoformat() if self.hold_expires_at else None
            )
        return data
