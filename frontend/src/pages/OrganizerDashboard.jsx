import { PlusCircle, Ticket, DollarSign, Users, Calendar, Upload, Filter, Search, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function OrganizerDashboard() {
  const activeEvents = [];

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-32">
      {/* Dashboard Header & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
        <div className="md:col-span-8">
          <h2 className="text-5xl font-extrabold font-headline tracking-tighter text-tertiary mb-4">Organizer Overview</h2>
          <p className="text-on-surface-variant max-w-xl text-lg">Manage your premier event experiences and track real-time engagement with our high-fidelity digital concierge tools.</p>
        </div>
        <div className="md:col-span-4 flex items-end justify-end">
          <button className="w-full md:w-auto bg-gradient-primary text-on-primary px-8 py-4 rounded-xl flex items-center justify-center gap-3 font-bold shadow-[0_20px_40px_rgba(44,44,44,0.06)] active:scale-95 transition-transform">
            <PlusCircle size={20} />
            Create New Event
          </button>
        </div>

        {/* Bento Stats */}
        <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-[40px] flex flex-col justify-between h-48 group hover:bg-primary-container/5 transition-colors shadow-sm">
          <div className="flex justify-between items-start">
            <Ticket className="text-primary" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Tickets Sold</span>
          </div>
          <div>
            <div className="text-4xl font-headline font-extrabold tracking-tighter text-tertiary">0</div>
          </div>
        </div>
        <div className="md:col-span-4 bg-inverse-surface p-8 rounded-[40px] flex flex-col justify-between h-48 shadow-sm">
          <div className="flex justify-between items-start">
            <DollarSign className="text-primary-fixed" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-surface-variant">Revenue (USD)</span>
          </div>
          <div>
            <div className="text-4xl font-headline font-extrabold tracking-tighter text-surface">$0</div>
          </div>
        </div>
        <div className="md:col-span-4 bg-surface-container-lowest p-8 rounded-[40px] flex flex-col justify-between h-48 group hover:bg-primary-container/5 transition-colors shadow-sm">
          <div className="flex justify-between items-start">
            <Users className="text-primary" size={24} />
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Waitlist Size</span>
          </div>
          <div>
            <div className="text-4xl font-headline font-extrabold tracking-tighter text-tertiary">0</div>
          </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Create Event Form */}
        <section className="lg:col-span-5 bg-surface-container-lowest rounded-[40px] p-10 shadow-[0_20px_40px_rgba(44,44,44,0.06)] h-fit">
          <h3 className="text-2xl font-headline font-bold tracking-tighter text-tertiary mb-8">Event Brief</h3>
          <form className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block ml-1">Event Title</label>
              <input className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-0 focus:border-secondary border-b-2 border-transparent transition-all" placeholder="Event Title" type="text"/>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block ml-1">Date</label>
                <input className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-0 focus:border-secondary border-b-2 border-transparent transition-all" type="date"/>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block ml-1">Capacity</label>
                <input className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-0 focus:border-secondary border-b-2 border-transparent transition-all" placeholder="500" type="number"/>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block ml-1">Venue Name</label>
              <input className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 focus:ring-0 focus:border-secondary border-b-2 border-transparent transition-all" placeholder="Venue Name" type="text"/>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant block ml-1">Visual Identity</label>
              <div className="h-32 w-full rounded-xl border-2 border-dashed border-outline-variant/30 flex flex-col items-center justify-center bg-surface-container-high/30 cursor-pointer hover:bg-surface-container-high transition-colors">
                <Upload className="text-outline" size={24} />
                <span className="text-sm font-bold text-on-surface-variant mt-2">Upload Poster</span>
              </div>
            </div>
            <button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold tracking-tight hover:bg-primary-container transition-all active:scale-95" type="submit">Publish to Concierge</button>
          </form>
        </section>

        {/* Active Events List */}
        <section className="lg:col-span-7">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-headline font-bold tracking-tighter text-tertiary">Active Portfolio</h3>
            <div className="flex gap-2">
              <button className="p-2 rounded-xl bg-surface-container text-tertiary hover:bg-surface-container-high transition-colors">
                <Filter size={20} />
              </button>
              <button className="p-2 rounded-xl bg-surface-container text-tertiary hover:bg-surface-container-high transition-colors">
                <Search size={20} />
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {activeEvents.length > 0 ? activeEvents.map(event => (
              <div key={event.id} className="bg-surface-container-lowest rounded-full p-6 flex items-center gap-6 group hover:translate-x-2 transition-transform duration-300 shadow-sm">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-xl">
                  <img className="w-full h-full object-cover" src={event.image} alt={event.title} referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-headline font-bold text-lg text-tertiary">{event.title}</h4>
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full",
                      event.status === 'Selling Fast' ? "bg-secondary-container/20 text-secondary" : 
                      event.status === 'Sold Out' ? "bg-red-100 text-red-600" : "bg-surface-container-high text-tertiary/60"
                    )}>
                      {event.status}
                    </span>
                  </div>
                  <p className="text-sm text-on-surface-variant font-medium flex items-center gap-2 mb-3">
                    <Calendar size={12} /> {event.date} · {event.venue}
                  </p>
                  <div className="flex items-center gap-8">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Capacity</div>
                      <div className="text-sm font-bold">{event.capacity}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Price</div>
                      <div className="text-sm font-bold">{event.price}</div>
                    </div>
                    <div className="ml-auto">
                      <ChevronRight className="text-tertiary/20 group-hover:text-primary transition-colors cursor-pointer" />
                    </div>
                  </div>
                </div>
              </div>
            )) : (
              <div className="bg-surface-container-lowest rounded-[40px] p-12 text-center">
                <Calendar className="mx-auto text-outline-variant mb-4" size={48} />
                <p className="text-on-surface-variant font-medium">No active events in your portfolio. Create your first event to get started.</p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
