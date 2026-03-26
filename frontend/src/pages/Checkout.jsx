import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Armchair, Lock, CheckCircle, XCircle, Headset } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { selectedSeats, clearBooking } = useBooking();
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'fail'

  const subtotal = selectedSeats.length * 18.00; // Example price
  const conciergeFee = 4.50;
  const taxes = 2.15;
  const total = subtotal + conciergeFee + taxes;

  const handlePayment = (type) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStatus(type);
      if (type === 'success') {
        setTimeout(() => {
          clearBooking();
          navigate('/user-dashboard');
        }, 2000);
      }
    }, 1500);
  };

  if (selectedSeats.length === 0 && !status) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={() => navigate('/')} className="text-primary font-bold underline">Go back to events</button>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-12">
          <section>
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-4 block">Review Selection</label>
            <h2 className="text-4xl md:text-5xl font-extrabold font-headline tracking-tighter text-tertiary leading-none">Complete Your Journey</h2>
            
            <div className="mt-10 relative group overflow-hidden rounded-[40px] aspect-[21/9]">
              <img 
                src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop" 
                alt="Venue" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary/60 to-transparent"></div>
              <div className="absolute bottom-6 left-8 text-surface">
                <h3 className="text-2xl font-bold font-headline">Interstellar: 10th Anniversary</h3>
                <p className="text-sm opacity-90 font-medium">Grand Odyssey Hall • Row F, Seats {selectedSeats.join('-')}</p>
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest p-8 rounded-[40px] shadow-[0_20px_40px_rgba(44,44,44,0.04)]">
              <div className="flex items-center gap-4 mb-4 text-primary">
                <Calendar size={20} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Date & Time</span>
              </div>
              <p className="text-xl font-bold text-tertiary">Friday, Oct 24</p>
              <p className="text-on-surface-variant">08:30 PM (GMT -5)</p>
            </div>
            <div className="bg-surface-container-lowest p-8 rounded-[40px] shadow-[0_20px_40px_rgba(44,44,44,0.04)]">
              <div className="flex items-center gap-4 mb-4 text-primary">
                <Armchair size={20} />
                <span className="text-[10px] uppercase tracking-widest font-bold">Selected Seats</span>
              </div>
              <div className="flex gap-2">
                {selectedSeats.map(seat => (
                  <span key={seat} className="px-3 py-1 bg-surface-container-high rounded-lg text-sm font-bold text-tertiary">{seat}</span>
                ))}
              </div>
            </div>
          </section>

          <section>
            <label className="text-[10px] uppercase tracking-widest font-bold text-secondary mb-6 block">Order Breakdown</label>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-on-surface-variant font-medium">Standard Admission (x{selectedSeats.length})</span>
                <span className="font-bold text-tertiary">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-on-surface-variant font-medium">Service Concierge Fee</span>
                <span className="font-bold text-tertiary">${conciergeFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-on-surface-variant font-medium">Local Taxes</span>
                <span className="font-bold text-tertiary">${taxes.toFixed(2)}</span>
              </div>
              <div className="pt-6 mt-6 border-t border-outline-variant/20 flex justify-between items-end">
                <div>
                  <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">Total Amount</p>
                  <p className="text-4xl font-extrabold font-headline text-primary tracking-tighter">${total.toFixed(2)}</p>
                </div>
                <span className="text-xs text-on-surface-variant italic leading-tight text-right max-w-[140px]">Prices include VAT and all digital delivery charges.</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Payment */}
        <div className="lg:col-span-5 sticky top-32">
          <div className="bg-inverse-surface text-surface rounded-[40px] p-10 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            
            {status === 'success' ? (
              <div className="relative z-10 text-center py-10">
                <CheckCircle size={64} className="text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-2">Payment Successful</h3>
                <p className="opacity-70">Redirecting to your dashboard...</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold font-headline mb-8 relative z-10">Secure Payment</h3>
                <div className="space-y-6 relative z-10">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70">Cardholder Name</label>
                    <input className="w-full bg-tertiary-container/30 border-0 border-b-2 border-secondary/40 focus:border-secondary focus:ring-0 rounded-none px-0 py-3 text-surface placeholder:text-surface/30 font-bold tracking-tight" placeholder="ALEXANDER VANCE" type="text"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold opacity-70">Card Number</label>
                    <input className="w-full bg-tertiary-container/30 border-0 border-b-2 border-secondary/40 focus:border-secondary focus:ring-0 rounded-none px-0 py-3 text-surface placeholder:text-surface/30 font-bold tracking-widest" placeholder="**** **** **** 4829" type="text"/>
                  </div>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-70">Expiry Date</label>
                      <input className="w-full bg-tertiary-container/30 border-0 border-b-2 border-secondary/40 focus:border-secondary focus:ring-0 rounded-none px-0 py-3 text-surface placeholder:text-surface/30 font-bold tracking-tight" placeholder="MM/YY" type="text"/>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest font-bold opacity-70">CVV</label>
                      <input className="w-full bg-tertiary-container/30 border-0 border-b-2 border-secondary/40 focus:border-secondary focus:ring-0 rounded-none px-0 py-3 text-surface placeholder:text-surface/30 font-bold tracking-tight" placeholder="***" type="password"/>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-4 relative z-10">
                  <button 
                    disabled={isProcessing}
                    onClick={() => handlePayment('success')}
                    className="w-full bg-gradient-primary text-on-primary font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-transform active:scale-95 hover:shadow-xl hover:shadow-primary/20 group disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                    ) : (
                      <>
                        <Lock size={18} />
                        Confirm and Pay ${total.toFixed(2)}
                      </>
                    )}
                  </button>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={() => handlePayment('success')}
                      className="bg-surface/5 border border-surface/10 hover:bg-surface/10 text-surface/80 text-xs font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <CheckCircle size={14} className="text-green-400" />
                      Mock Success
                    </button>
                    <button 
                      onClick={() => handlePayment('fail')}
                      className="bg-surface/5 border border-surface/10 hover:bg-surface/10 text-surface/80 text-xs font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
                    >
                      <XCircle size={14} className="text-red-400" />
                      Mock Fail
                    </button>
                  </div>
                </div>
                {status === 'fail' && (
                  <p className="text-red-400 text-xs text-center mt-4 font-bold">Payment failed. Please try again.</p>
                )}
                <p className="text-[10px] text-center mt-8 opacity-40 font-medium px-4">By completing this purchase, you agree to our Terms of Service and Cancellation Policy. Tickets are non-refundable within 24 hours of the event.</p>
              </>
            )}
          </div>

          {/* Concierge Bar */}
          <div className="mt-8 bg-surface-container-lowest/80 backdrop-blur-md p-6 rounded-full flex items-center justify-between shadow-[0_20px_40px_rgba(44,44,44,0.06)] border border-outline-variant/10">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                <Headset size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Need Assistance?</p>
                <p className="text-sm font-bold text-tertiary">Chat with a Concierge</p>
              </div>
            </div>
            <button className="bg-tertiary text-surface px-6 py-2 rounded-full text-sm font-bold hover:bg-primary transition-colors">Connect</button>
          </div>
        </div>
      </div>
    </main>
  );
}
