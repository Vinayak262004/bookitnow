import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function EventCard({ event, variant = 'standard' }) {
  const isLarge = variant === 'large';
  const isSquare = variant === 'square';

  return (
    <Link 
      to={`/event/${event.id}`} 
      className={cn(
        "group cursor-pointer block",
        isLarge && "lg:col-span-2"
      )}
    >
      <div className={cn(
        "relative overflow-hidden rounded-full mb-6",
        isLarge ? "aspect-[16/9]" : isSquare ? "aspect-square" : "aspect-[4/5]"
      )}>
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {event.featured && (
          <div className="absolute top-6 left-6 bg-surface/80 backdrop-blur-md px-4 py-2 rounded-xl">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Featured Event</span>
          </div>
        )}
        <div className={cn(
          "absolute px-4 py-2 rounded-xl text-xs font-bold",
          event.seatsRemaining === 0 
            ? "top-6 right-6 bg-surface/80 backdrop-blur-md text-tertiary" 
            : isLarge ? "bottom-6 right-6 bg-inverse-surface text-inverse-on-surface" : "bottom-6 left-6 bg-surface/80 backdrop-blur-md text-tertiary"
        )}>
          {event.seatsRemaining === 0 ? 'SOLD OUT' : `${event.seatsRemaining} SEATS REMAINING`}
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h3 className={cn(
            "font-headline font-bold tracking-tighter text-tertiary group-hover:text-primary transition-colors",
            isLarge ? "text-3xl" : "text-2xl"
          )}>
            {event.title}
          </h3>
          <p className="text-tertiary opacity-60 font-medium">
            {event.location} • {event.date}
          </p>
        </div>
        {isLarge && <ArrowUpRight className="text-primary text-3xl" />}
      </div>
    </Link>
  );
}
