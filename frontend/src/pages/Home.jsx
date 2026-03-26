import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high border border-outline-variant/20">
              <Star className="text-secondary" size={16} fill="currentColor" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-tertiary">The Future of Event Booking</span>
            </div>
            
            <h1 className="font-headline text-6xl md:text-8xl font-extrabold tracking-tighter text-tertiary leading-[0.85]">
              ACCESS THE<br/>
              <span className="text-primary-container">UNREACHABLE.</span>
            </h1>
            
            <p className="text-xl text-tertiary/60 max-w-lg leading-relaxed font-medium">
              BookItNow is your exclusive gateway to the world's most coveted experiences. From private symphonies to underground culinary journeys.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/login" 
                className="group bg-gradient-primary text-on-primary px-10 py-5 rounded-full font-bold text-lg shadow-2xl shadow-primary/20 flex items-center gap-3 active:scale-95 transition-all"
              >
                Get Started
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>
          </div>
          
          <div className="relative hidden lg:block">
            <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop" 
                alt="Luxury Event" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary/60 to-transparent"></div>
              <div className="absolute bottom-10 left-10 text-on-primary">
                <p className="text-sm font-bold uppercase tracking-widest opacity-80 mb-2">Featured Experience</p>
                <h3 className="text-3xl font-headline font-bold">The Midnight Symphony</h3>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-headline font-bold text-tertiary tracking-tight mb-4">Why BookItNow?</h2>
            <p className="text-tertiary/60 max-w-2xl mx-auto">We redefine how you discover and experience the world around you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="p-10 rounded-[32px] bg-surface-container-low hover:bg-surface-container-high transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Shield className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-headline font-bold text-tertiary mb-4">Secure Access</h3>
              <p className="text-tertiary/60 leading-relaxed">Verified listings and secure payment processing for total peace of mind.</p>
            </div>
            
            <div className="p-10 rounded-[32px] bg-surface-container-low hover:bg-surface-container-high transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Zap className="text-secondary" size={32} />
              </div>
              <h3 className="text-2xl font-headline font-bold text-tertiary mb-4">Instant Booking</h3>
              <p className="text-tertiary/60 leading-relaxed">Real-time availability and instant confirmation for all curated events.</p>
            </div>
            
            <div className="p-10 rounded-[32px] bg-surface-container-low hover:bg-surface-container-high transition-colors group">
              <div className="w-16 h-16 rounded-2xl bg-tertiary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Star className="text-tertiary" size={32} />
              </div>
              <h3 className="text-2xl font-headline font-bold text-tertiary mb-4">Curated List</h3>
              <p className="text-tertiary/60 leading-relaxed">Only the most exceptional events make it onto our platform.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
