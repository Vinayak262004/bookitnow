from datetime import datetime, timezone
from app.extensions import db

class Event(db.Model):
    __tablename__ = "events"

    id = db.Column(db.Integer, primary_key=True)
    organizer_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, index=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(80), nullable=False)
    venue_name = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(150), nullable=False)
    start_at = db.Column(db.DateTime, nullable=False)
    image_url = db.Column(db.Text, nullable=True)
    price = db.Column(db.Float, nullable=False)
    capacity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(20), nullable=False, default="draft")
    created_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    organizer = db.relationship("User", back_populates="events")

    def to_dict(self):
        return {
            "id": self.id,
            "organizer_id": self.organizer_id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "venue_name": self.venue_name,
            "location": self.location,
            "start_at": self.start_at.isoformat(),
            "image_url": self.image_url,
            "price": self.price,
            "capacity": self.capacity,
            "status": self.status,
            "created_at": self.created_at.isoformat(),
            "seats_remaining": self.capacity,
        }
