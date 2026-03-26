import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, User, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-surface-container-low/80 backdrop-blur-xl sticky top-0 z-50 border-none">
      <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <Menu className="text-primary-container cursor-pointer hover:opacity-80 transition-opacity" size={24} />
          <Link to={user ? "/explore" : "/"} className="text-2xl font-bold tracking-tighter text-tertiary font-headline">
            BookItNow
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/explore" className="text-primary-container font-bold font-headline tracking-tighter hover:opacity-80 transition-opacity">
            Explore
          </Link>
          {user && (
            <Link 
              to={user.role === 'organizer' ? '/organizer-dashboard' : '/user-dashboard'} 
              className="text-tertiary font-headline tracking-tighter hover:opacity-80 transition-opacity"
            >
              Bookings
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-tertiary hidden sm:inline">Hi, {user.name}</span>
              <button 
                onClick={() => { logout(); navigate('/login'); }}
                className="text-primary-container hover:opacity-80 transition-opacity"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-gradient-primary text-on-primary px-6 py-2 rounded-xl font-bold text-sm active:scale-95 transition-transform duration-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
