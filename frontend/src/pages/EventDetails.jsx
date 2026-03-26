import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, MapPin, Share2, Heart, Lock } from 'lucide-react';
import { useBooking } from '../context/BookingContext';
import { cn } from '../lib/utils';

const MOCK_EVENT_DETAILS = {
  id: 1,
  title: "The Midnight Symphony",
  location: "Grand Opera House, London",
  date: "Friday, Oct 24 • 8:30 PM",
  image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop",
  description: "Experience an evening of unparalleled acoustic mastery as the orchestra presents a contemporary interpretation of classical masterworks. This one-night-only performance features world-class soloists, bringing a haunting depth to the evening's repertoire.",
  tags: ["Classical", "Orchestra", "Exclusive"],
  price: 90.00
};

const ROWS = ['A', 'B', 'C', 'D'];
const SEATS_PER_ROW = 8;

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedSeats, toggleSeat, setSelectedSeats } = useBooking();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    // Simulate fetch
    setEvent(MOCK_EVENT_DETAILS);
    setSelectedSeats([]); // Reset selection on new event
  }, [id, setSelectedSeats]);

  if (!event) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-32 text-center">
        <Calendar className="mx-auto text-outline-variant mb-4" size={48} />
        <h2 className="text-2xl font-headline font-bold text-tertiary mb-2">Event Not Found</h2>
        <p className="text-on-surface-variant mb-8">The event you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/')} className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold">
          Back to Events
        </button>
      </div>
    );
  }

  const subtotal = selectedSeats.length * event.price;
  const bookingFee = 12.50;
  const vat = subtotal * 0.15;
  const total = subtotal + bookingFee + vat;

  return (
    <main className="max-w-7xl mx-auto px-6 py-10 md:py-16">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16">
        <div className="lg:col-span-8 relative rounded-xl overflow-hidden aspect-[16/9] lg:aspect-[21/9] group">
          <img 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            src={event.image} 
            alt={event.title}
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-0 left-0 p-8 w-full bg-gradient-to-t from-tertiary/80 to-transparent">
            <div className="inline-block px-4 py-1 bg-surface/70 backdrop-blur-md rounded-full mb-4">
              <span className="text-primary font-label text-xs uppercase tracking-widest font-bold">Limited Performance</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-extrabold text-surface tracking-tighter">{event.title}</h2>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="p-6 bg-surface-container-lowest rounded-xl">
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="text-primary-container" size={24} />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-outline">Date & Time</p>
                <p className="font-bold text-tertiary">{event.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="text-primary-container" size={24} />
              <div>
                <p className="text-xs uppercase tracking-widest font-bold text-outline">Location</p>
                <p className="font-bold text-tertiary">{event.location}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 border border-outline/20 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
              <Share2 size={20} /> Share
            </button>
            <button className="flex-1 border border-outline/20 py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
              <Heart size={20} /> Save
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Details & Selection */}
        <div className="lg:col-span-7 space-y-12">
          <article>
            <h3 className="text-2xl font-headline font-bold mb-6 text-tertiary">About the Performance</h3>
            <p className="text-on-surface-variant leading-relaxed mb-6">
              {event.description}
            </p>
            <div className="flex flex-wrap gap-4">
              {event.tags.map(tag => (
                <span key={tag} className="px-4 py-2 bg-surface-container-high rounded-lg text-sm font-medium">{tag}</span>
              ))}
            </div>
          </article>

          {/* Seat Selection */}
          <section className="bg-surface-container-lowest p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-headline font-bold text-tertiary">Select Your Experience</h3>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-surface-container-high"></div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-outline">Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary-container"></div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-outline">Selected</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-tertiary-container/30"></div>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-outline">Booked</span>
                </div>
              </div>
            </div>
            
            <div className="w-full h-1 bg-outline-variant/30 rounded-full mb-12 relative">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold text-outline uppercase tracking-[0.2em]">Stage</span>
            </div>

            <div className="flex flex-col gap-4 overflow-x-auto hide-scrollbar pb-4">
              {ROWS.map(row => (
                <div key={row} className="flex justify-center gap-3 min-w-max">
                  <span className="w-6 text-[10px] font-bold text-outline flex items-center">{row}</span>
                  {[...Array(SEATS_PER_ROW)].map((_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const isBooked = (row === 'C' && (i === 2 || i === 3)) || (row === 'A' && (i === 0 || i === 7));
                    const isSelected = selectedSeats.includes(seatId);

                    return (
                      <button
                        key={seatId}
                        onClick={() => !isBooked && toggleSeat(seatId)}
                        disabled={isBooked}
                        className={cn(
                          "w-8 h-8 rounded-lg transition-all flex items-center justify-center",
                          isBooked ? "bg-tertiary-container/30 cursor-not-allowed" : 
                          isSelected ? "bg-primary-container shadow-md ring-2 ring-primary-container ring-offset-2" : 
                          "bg-surface-container-high hover:bg-primary/20"
                        )}
                      >
                        {isBooked && row === 'C' && <Lock size={14} className="text-surface" />}
                      </button>
                    );
                  })}
                  <span className="w-6 text-[10px] font-bold text-outline flex items-center justify-end">{row}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-8">
            <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-[0_20px_40px_rgba(44,44,44,0.06)]">
              <h4 className="text-xl font-headline font-bold mb-8 text-tertiary">Booking Summary</h4>
              {selectedSeats.length > 0 ? (
                <>
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-on-surface">Premium Orchestra Seating</p>
                        <p className="text-xs font-bold text-outline uppercase tracking-wider">{selectedSeats.join(', ')}</p>
                      </div>
                      <p className="font-bold text-primary">${subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-on-surface-variant">Booking Fee</p>
                      <p className="font-medium">${bookingFee.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p className="text-on-surface-variant">VAT (15%)</p>
                      <p className="font-medium">${vat.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="pt-6 border-t border-outline-variant/30 mb-8 flex justify-between items-end">
                    <div>
                      <p className="text-xs font-bold text-outline uppercase tracking-widest mb-1">Total Amount</p>
                      <p className="text-3xl font-headline font-extrabold text-tertiary tracking-tighter">${total.toFixed(2)}</p>
                    </div>
                    <p className="text-[10px] text-outline italic">Refundable up to 24h before</p>
                  </div>
                  <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-gradient-primary text-on-primary py-5 rounded-xl font-bold text-lg hover:opacity-90 active:scale-95 duration-200 transition-all shadow-lg shadow-primary-container/20"
                  >
                    Proceed to Book
                  </button>
                </>
              ) : (
                <div className="text-center py-10">
                  <p className="text-on-surface-variant font-medium">Please select your seats to continue</p>
                </div>
              )}
            </div>
            
            {/* Neighborhood Info */}
            <div className="bg-surface p-6 rounded-2xl border border-outline-variant/10">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-secondary" size={20} />
                <span className="text-xs font-bold text-outline uppercase tracking-widest">The Neighborhood</span>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden mb-4 grayscale">
                <img 
                  className="w-full h-full object-cover opacity-60" 
                  src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop" 
                  alt="Map"
                  referrerPolicy="no-referrer"
                />
              </div>
              <p className="text-sm text-on-surface-variant leading-relaxed">Located in the heart of the cultural district, the venue is surrounded by fine dining and secure valet parking.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
