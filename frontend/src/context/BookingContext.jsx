import { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev => 
      prev.includes(seatId) 
        ? prev.filter(id => id !== seatId) 
        : [...prev, seatId]
    );
  };

  const clearBooking = () => {
    setSelectedSeats([]);
    setBookingDetails(null);
  };

  return (
    <BookingContext.Provider value={{ 
      selectedSeats, 
      setSelectedSeats,
      toggleSeat, 
      currentEvent, 
      setCurrentEvent,
      bookingDetails,
      setBookingDetails,
      clearBooking
    }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
