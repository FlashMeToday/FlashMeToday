import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiMail, FiPhone, FiCheck, FiX, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';
import { FaUserCircle, FaCamera } from 'react-icons/fa';
import { API_URL } from '../../config/api';

const BookingsTab = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, [page]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/bookings?page=${page}&limit=20`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/bookings/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setBookings(bookings.map(b => b._id === id ? { ...b, status: newStatus } : b));
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDelete = async () => {
    if (!selectedBooking) return;
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/bookings/${selectedBooking._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setBookings(bookings.filter(b => b._id !== selectedBooking._id));
        setIsDeleteModalOpen(false);
        setSelectedBooking(null);
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          b.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.typeOfShoot.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return 'bg-yellow-50 text-yellow-600 border-yellow-200';
      case 'Confirmed': return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'Completed': return 'bg-green-50 text-green-600 border-green-200';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-200';
      default: return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">Bookings</h2>
            <div className="bg-purple-100 text-[var(--color-primary)] font-black text-xs px-3 py-1 rounded-full shadow-sm">
              {bookings.length} Total
            </div>
          </div>
          <p className="text-gray-500 mt-1">Manage and track all shoot bookings.</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 font-bold px-4 py-2.5 rounded-xl shadow-sm focus:outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all outline-none"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <div className="relative group flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 group-focus-within:text-[var(--color-primary)] transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search name, email, shoot type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-gray-200 text-gray-900 text-sm rounded-xl pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all shadow-sm outline-none font-medium placeholder:font-normal"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-10 space-y-4">
        {loading && bookings.length === 0 ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <FiCalendar className="mx-auto text-5xl text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Bookings Found</h3>
            <p className="text-gray-500">We couldn't find any bookings matching your criteria.</p>
          </div>
        ) : (
          filteredBookings.map((booking) => (
            <motion.div 
              key={booking._id} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all relative overflow-hidden"
            >
              <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-50">
                <div className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </div>
                <div className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
                  <FiClock className="text-gray-300" /> Booked on {new Date(booking.createdAt).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                <div className="lg:w-[35%] flex items-start gap-5">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-purple-100 to-indigo-100 flex items-center justify-center flex-shrink-0 text-purple-700 border border-purple-200 shadow-sm">
                    <span className="text-xl font-black">{booking.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-3">{booking.name}</h3>
                    <div className="space-y-2.5">
                      <a href={`mailto:${booking.email}`} className="flex items-center gap-3 text-sm text-gray-500 font-medium hover:text-[var(--color-primary)] transition-colors"><FiMail className="text-gray-400" /> {booking.email}</a>
                      <a href={`tel:${booking.mobile}`} className="flex items-center gap-3 text-sm text-gray-500 font-medium hover:text-[var(--color-primary)] transition-colors"><FiPhone className="text-gray-400" /> {booking.mobile}</a>
                      <span className="flex items-center gap-3 text-sm text-gray-500 font-medium"><FiMapPin className="text-gray-400" /> {booking.city}</span>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[35%] border-l-0 lg:border-l border-gray-100 lg:pl-10">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-5 flex items-center gap-2">
                    <FaCamera className="text-gray-300" /> Shoot Details
                  </h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-medium">Type</span>
                      <span className="text-sm font-bold text-gray-900">{booking.typeOfShoot}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-medium">Plan</span>
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${booking.plan === 'Occasions' ? 'bg-pink-50 text-pink-600' : 'bg-indigo-50 text-indigo-600'}`}>{booking.plan}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 font-medium">Time</span>
                      <span className="text-sm font-bold text-[var(--color-primary)]">
                        {new Date(booking.shootTime).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}
                      </span>
                    </div>
                    {booking.location && (
                      <div className="flex justify-between items-start pt-3 mt-1 border-t border-gray-50">
                        <span className="text-xs text-gray-500 font-medium whitespace-nowrap mr-4">Venue</span>
                        <span className="text-xs font-bold text-gray-700 text-right">{booking.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="lg:w-[30%] border-l-0 lg:border-l border-gray-100 lg:pl-10 flex flex-col justify-center gap-3">
                  {booking.status !== 'Confirmed' && booking.status !== 'Completed' && (
                    <button 
                      onClick={() => updateStatus(booking._id, 'Confirmed')}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gray-900 hover:bg-black text-white text-sm font-bold rounded-xl transition-all shadow-md hover:shadow-lg active:scale-95"
                    >
                      <FiCheck className="text-lg" /> Confirm Booking
                    </button>
                  )}
                  {booking.status === 'Confirmed' && (
                    <button 
                      onClick={() => updateStatus(booking._id, 'Completed')}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-sm font-bold rounded-xl transition-all active:scale-95"
                    >
                      <FiCheck className="text-lg" /> Mark Completed
                    </button>
                  )}
                  <div className="flex gap-3 w-full">
                    {booking.status !== 'Cancelled' && booking.status !== 'Completed' && (
                      <button 
                        onClick={() => updateStatus(booking._id, 'Cancelled')}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-600 border border-gray-200 text-sm font-bold rounded-xl transition-all active:scale-95"
                      >
                        <FiX /> Cancel
                      </button>
                    )}
                    <button 
                      onClick={() => { setSelectedBooking(booking); setIsDeleteModalOpen(true); }}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-sm font-bold rounded-xl transition-all active:scale-95"
                    >
                      <FiTrash2 /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-3xl text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Booking?</h3>
              <p className="text-gray-500 text-sm mb-6">Are you sure you want to remove the booking from <strong>{selectedBooking?.name}</strong>? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 px-4 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-colors">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default BookingsTab;
