import { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Tag } from 'lucide-react';
import EventCard from '../components/EventCard';

// Featured events to showcase the platform's capabilities
const FEATURED_EVENTS = [
  {
    id: 1,
    title: "The Crimson Gala: Midnight Symphony",
    location: "Opera House, Vienna",
    date: "Oct 24, 2024",
    image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
    featured: true,
    seatsRemaining: 12,
    category: "Music"
  },
  {
    id: 2,
    title: "Neon Horizon Music Fest",
    location: "Skyline Arena, Tokyo",
    date: "Nov 02, 2024",
    image: "https://images.unsplash.com/photo-1459749411177-042180ceea72?q=80&w=2070&auto=format&fit=crop",
    seatsRemaining: 56,
    category: "Music"
  },
  {
    id: 3,
    title: "The Alchemist’s Table",
    location: "Secret Garden, Paris",
    date: "Oct 29, 2024",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2074&auto=format&fit=crop",
    seatsRemaining: 0,
    category: "Culinary"
  },
  {
    id: 4,
    title: "Abstraction & Soul Exhibition",
    location: "MoMA Loft, New York",
    date: "Nov 15, 2024",
    image: "https://images.unsplash.com/photo-1531050171652-597467c85771?q=80&w=2070&auto=format&fit=crop",
    seatsRemaining: 8,
    category: "Art & Culture"
  },
  {
    id: 5,
    title: "Laughter Lounge: Stand-up Night",
    location: "The Comedy Cellar, NYC",
    date: "Dec 05, 2024",
    image: "https://images.unsplash.com/photo-1585699324551-f6c309eedee6?q=80&w=2070&auto=format&fit=crop",
    seatsRemaining: 20,
    category: "Comedy"
  },
  {
    id: 6,
    title: "Electric Pulse: Live Concert",
    location: "Wembley Stadium, London",
    date: "Jan 12, 2025",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop",
    seatsRemaining: 150,
    category: "Music"
  },
  {
    id: 7,
    title: "Cinema Under the Stars",
    location: "Hollywood Bowl, LA",
    date: "Feb 20, 2025",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop",
    seatsRemaining: 45,
    category: "Cinema"
  }
];

export default function Explore() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setEvents(FEATURED_EVENTS);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 pb-32">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-8">
            <h2 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter text-tertiary leading-[0.9]">
              EXCEPTIONAL<br/>
              <span className="text-primary-container">MOMENTS</span><br/>
              CURATED.
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-lg text-tertiary opacity-70 mb-8 max-w-xs">
              Access the world's most exclusive events through our digital concierge service. Bespoke experiences, hosted just for you.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-24 z-40 mb-16">
        <div className="bg-surface-container-lowest rounded-full p-2 shadow-[0_20px_40px_rgba(44,44,44,0.06)] flex flex-wrap md:flex-nowrap items-center gap-2">
          <div className="flex-1 flex items-center px-6 py-3 gap-3">
            <MapPin className="text-primary" size={20} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-tertiary opacity-40">Location</span>
              <input 
                className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold placeholder:text-tertiary/30 w-full" 
                placeholder="Where to?" 
                type="text"
              />
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-surface-container-high"></div>
          <div className="flex-1 flex items-center px-6 py-3 gap-3">
            <Calendar className="text-primary" size={20} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-tertiary opacity-40">Date</span>
              <input 
                className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold placeholder:text-tertiary/30 w-full" 
                placeholder="Add dates" 
                type="text"
              />
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-surface-container-high"></div>
          <div className="flex-1 flex items-center px-6 py-3 gap-3">
            <Tag className="text-primary" size={20} />
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-widest font-bold text-tertiary opacity-40">Category</span>
              <select className="bg-transparent border-none p-0 focus:ring-0 text-sm font-bold appearance-none cursor-pointer w-full">
                <option>All Events</option>
                <option>Art & Culture</option>
                <option>Music</option>
                <option>Culinary</option>
              </select>
            </div>
          </div>
          <button className="bg-gradient-primary text-on-primary p-4 rounded-full flex items-center justify-center hover:opacity-90 transition-all">
            <Search size={24} />
          </button>
        </div>
      </section>

      {/* Events Grid */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              variant={index === 0 || index === 3 ? "large" : index === 2 ? "square" : "standard"} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-container-lowest rounded-[40px]">
          <Calendar className="mx-auto text-outline-variant mb-4" size={48} />
          <p className="text-on-surface-variant font-medium text-lg">No events are currently scheduled.</p>
          <p className="text-on-surface-variant opacity-60">Check back later for new curated experiences.</p>
        </div>
      )}
    </div>
  );
}
