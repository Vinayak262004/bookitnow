import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { BookingProvider } from './context/BookingContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './pages/Login';
import Signup from './pages/Signup';
import EventDetails from './pages/EventDetails';
import Checkout from './pages/Checkout';
import UserDashboard from './pages/UserDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';

export default function App() {
  return (
    <AuthProvider>
      <BookingProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/explore" element={<Explore />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/event/:id" element={<EventDetails />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/checkout" 
                  element={
                    <ProtectedRoute role="user">
                      <Checkout />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/user-dashboard" 
                  element={
                    <ProtectedRoute role="user">
                      <UserDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/organizer-dashboard" 
                  element={
                    <ProtectedRoute role="organizer">
                      <OrganizerDashboard />
                    </ProtectedRoute>
                  } 
                />
              </Routes>
            </div>
            
            {/* Simple Footer */}
            <footer className="py-12 px-6 text-center border-t border-outline-variant/10 mt-auto">
              <p className="font-label text-[10px] uppercase tracking-[0.3em] text-tertiary opacity-40">
                © 2024 BookItNow. All Rights Reserved.
              </p>
            </footer>
          </div>
        </Router>
      </BookingProvider>
    </AuthProvider>
  );
}
