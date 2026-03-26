from datetime import datetime
from app import create_app
from app.extensions import db
from app.models.user import User
from app.models.event import Event

app = create_app()

def seed_data():
    with app.app_context():
        if User.query.count() > 0:
            return

        organizer = User(name="Organizer Demo", email="organizer@bookitnow.com", role="organizer")
        organizer.set_password("password123")

        user = User(name="User Demo", email="user@bookitnow.com", role="user")
        user.set_password("password123")

        db.session.add_all([organizer, user])
        db.session.commit()

        events = [
            Event(
                organizer_id=organizer.id,
                title="The Midnight Symphony",
                description="A one-night orchestral performance for premium guests.",
                category="Music",
                venue_name="Grand Opera House",
                location="London",
                start_at=datetime.fromisoformat("2026-04-10T20:30:00"),
                image_url="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
                price=90.0,
                capacity=32,
                status="published",
            ),
            Event(
                organizer_id=organizer.id,
                title="Neon Horizon Music Fest",
                description="An immersive music festival with curated live sets.",
                category="Music",
                venue_name="Skyline Arena",
                location="Tokyo",
                start_at=datetime.fromisoformat("2026-05-02T18:00:00"),
                image_url="https://images.unsplash.com/photo-1459749411177-042180ceea72?q=80&w=2070&auto=format&fit=crop",
                price=120.0,
                capacity=56,
                status="published",
            ),
        ]

        db.session.add_all(events)
        db.session.commit()

if __name__ == "__main__":
    seed_data()
    app.run(debug=True)
