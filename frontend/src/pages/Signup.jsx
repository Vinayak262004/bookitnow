import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function Signup() {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      login(email, role);
      navigate(role === 'organizer' ? '/organizer-dashboard' : '/explore');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-surface-container-lowest rounded-[40px] overflow-hidden shadow-[0_20px_40px_rgba(44,44,44,0.06)]">
        {/* Left Side: Visual */}
        <div className="relative hidden md:block overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop" 
            alt="Premium Event Space" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-multiply"></div>
          <div className="absolute bottom-12 left-12 right-12 z-10">
            <div className="bg-surface/80 backdrop-blur-xl p-8 rounded-[32px]">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-primary font-bold mb-4 block">The Digital Concierge</span>
              <h2 className="font-headline text-3xl font-bold tracking-tighter text-tertiary leading-tight mb-4">
                Start your journey with BookItNow.
              </h2>
              <p className="text-on-surface-variant font-body text-sm leading-relaxed">
                Experience events like never before. From exclusive galas to underground music fests.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center md:text-left">
            <h3 className="font-headline text-4xl font-extrabold tracking-tighter text-tertiary mb-2">Create Account</h3>
            <p className="text-on-surface-variant font-body">Join the elite community of BookItNow.</p>
          </div>

          {/* Role Selection */}
          <div className="flex p-1 bg-surface-container-high rounded-full mb-8">
            <button 
              onClick={() => setRole('user')}
              className={cn(
                "flex-1 py-3 px-6 rounded-full text-sm font-bold tracking-tight transition-all duration-300",
                role === 'user' ? "bg-surface-container-lowest text-primary shadow-sm" : "text-tertiary opacity-50 hover:opacity-100"
              )}
            >
              User
            </button>
            <button 
              onClick={() => setRole('organizer')}
              className={cn(
                "flex-1 py-3 px-6 rounded-full text-sm font-bold tracking-tight transition-all duration-300",
                role === 'organizer' ? "bg-surface-container-lowest text-primary shadow-sm" : "text-tertiary opacity-50 hover:opacity-100"
              )}
            >
              Organizer
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2 ml-1">Full Name</label>
              <input 
                className="w-full px-5 py-4 bg-surface-container-high border-none rounded-full focus:ring-0 focus:border-b-2 focus:border-secondary text-on-surface placeholder:text-outline-variant transition-all" 
                placeholder="Full Name" 
                type="text"
                required
              />
            </div>
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2 ml-1">Email Address</label>
              <input 
                className="w-full px-5 py-4 bg-surface-container-high border-none rounded-full focus:ring-0 focus:border-b-2 focus:border-secondary text-on-surface placeholder:text-outline-variant transition-all" 
                placeholder="Email" 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2 ml-1">Password</label>
              <input 
                className="w-full px-5 py-4 bg-surface-container-high border-none rounded-full focus:ring-0 focus:border-b-2 focus:border-secondary text-on-surface placeholder:text-outline-variant transition-all" 
                placeholder="••••••••" 
                type="password"
                required
              />
            </div>
            <div className="pt-4">
              <button className="w-full bg-gradient-primary text-on-primary py-5 rounded-full font-bold tracking-tight text-lg shadow-lg hover:opacity-90 active:scale-[0.98] transition-all" type="submit">
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-12 text-center">
            <p className="text-sm text-on-surface-variant font-body">
              Already have an account? 
              <Link to="/login" className="text-primary font-bold hover:underline ml-1">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
