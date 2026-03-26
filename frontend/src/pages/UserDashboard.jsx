import { useAuth } from '../context/AuthContext';
import { Star, Calendar, User, QrCode, MessageSquare } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();

  const bookings = [];

  return (
    <main className="max-w-7xl mx-auto px-6 pt-12 pb-32">
      {/* Dashboard Header */}
      <section className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-2 block">Premium Account</span>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-tertiary tracking-tighter">Welcome back, {user?.name || 'User'}</h2>
          </div>
          <div className="flex gap-4">
            <div className="bg-surface-container-lowest p-4 rounded-xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-on-primary">
                <Star size={24} />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-widest uppercase opacity-60">Loyalty Status</p>
                <p className="font-headline font-bold text-tertiary">Gold Member</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Active Bookings Summary */}
        <div className="md:col-span-8 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-headline font-bold text-tertiary tracking-tight">My Bookings</h3>
          </div>

          {bookings.length > 0 ? bookings.map(booking => (
            <div 
              key={booking.id}
              className={`group relative bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row h-auto md:h-64 transition-all hover:translate-y-[-4px] ${booking.status === 'Cancelled' ? 'opacity-70 grayscale-[0.5]' : ''}`}
            >
              <div className="md:w-1/3 relative h-48 md:h-full">
                <img className="w-full h-full object-cover" src={booking.image} alt={booking.title} referrerPolicy="no-referrer" />
                <div className={`absolute top-4 left-4 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${booking.status === 'Confirmed' ? 'bg-surface/90 text-primary' : 'bg-red-100 text-red-600'}`}>
                  {booking.status}
                </div>
              </div>
              <div className="md:w-2/3 p-8 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-2xl font-headline font-bold text-tertiary tracking-tight">{booking.title}</h4>
                    <span className={`font-headline font-bold ${booking.status === 'Cancelled' ? 'text-tertiary/40 line-through' : 'text-primary'}`}>{booking.price}</span>
                  </div>
                  {booking.refunded && <p className="text-xs text-red-600 font-bold uppercase tracking-widest mb-4">Refund Processed</p>}
                  <div className="flex gap-6 text-sm text-tertiary/70 font-medium">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{booking.date}</span>
                    </div>
                    {booking.guests && (
                      <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>{booking.guests}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-6">
                  {booking.ref ? (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center">
                        <QrCode className="text-primary" size={20} />
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-tertiary">Booking Ref: {booking.ref}</span>
                    </div>
                  ) : <div></div>}
                  <button className={`font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-md transition-colors ${booking.status === 'Confirmed' ? 'bg-primary text-on-primary hover:bg-primary-container' : 'text-tertiary/60 border border-outline-variant/20 hover:border-primary/40'}`}>
                    {booking.status === 'Confirmed' ? 'View Details' : 'Rebook Now'}
                  </button>
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-surface-container-lowest rounded-xl p-12 text-center">
              <Calendar className="mx-auto text-outline-variant mb-4" size={48} />
              <p className="text-on-surface-variant font-medium">No bookings found. Start exploring events to book your first experience.</p>
              <button className="mt-6 bg-primary text-on-primary px-8 py-3 rounded-full font-bold text-sm">Explore Events</button>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-surface-container-high/40 p-8 rounded-xl">
            <h3 className="text-sm font-extrabold uppercase tracking-widest text-tertiary mb-6">Account Summary</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-tertiary/70 text-sm font-medium">Total Bookings</span>
                <span className="text-xl font-headline font-bold text-tertiary">{bookings.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-tertiary/70 text-sm font-medium">Loyalty Points</span>
                <span className="text-xl font-headline font-bold text-primary">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
