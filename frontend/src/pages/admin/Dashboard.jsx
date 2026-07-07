import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiHome, 
  FiCalendar, 
  FiMessageSquare, 
  FiSettings, 
  FiLogOut, 
  FiBell, 
  FiSearch,
  FiTrendingUp,
  FiUsers,
  FiFileText,
  FiPhone,
  FiCamera,
  FiUserPlus,
  FiTrash2,
  FiAlertCircle,
  FiEye,
  FiX
} from 'react-icons/fi';
import logo from '../../assets/Logo/logo.webp';
import PhotographersTab from './PhotographersTab';
import BookingsTab from './BookingsTab';
import BlogsTab from './BlogsTab';

const SettingsTab = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (!oldPassword) {
      setError('Old Password is required');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/admin/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ oldPassword, newEmail, newPassword })
      });

      const data = await response.json();

      if (data.success) {
        setMessage('Credentials updated successfully!');
        if (data.token) {
          localStorage.setItem('adminToken', data.token); 
        }
        setOldPassword('');
        setNewEmail('');
        setNewPassword('');
      } else {
        setError(data.message || 'Failed to update credentials');
      }
    } catch (err) {
      setError('Server error, please try again later');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center w-full">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 w-full max-w-2xl"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
      
      {message && <div className="mb-6 p-4 bg-emerald-50 text-emerald-600 rounded-xl font-medium border border-emerald-100">{message}</div>}
      {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-100">{error}</div>}
      
      <form onSubmit={handleUpdate} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password (Required)</label>
          <input 
            type="password" 
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all text-sm outline-none"
            placeholder="Enter your current password"
          />
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <label className="block text-sm font-semibold text-gray-700 mb-2">New Email Address (Optional)</label>
          <input 
            type="email" 
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all text-sm outline-none"
            placeholder="Enter new email address"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">New Password (Optional)</label>
          <input 
            type="password" 
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-400 transition-all text-sm outline-none"
            placeholder="Enter new password (min 6 chars)"
          />
        </div>

        <div className="pt-4">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Credentials'}
          </button>
        </div>
      </form>
      </motion.div>
    </div>
  );
};

const ContactTab = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [messageToView, setMessageToView] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMessages, setTotalMessages] = useState(0);

  const fetchMessages = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/contact?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalMessages(data.total || 0);
      } else {
        setError(data.message || 'Failed to fetch messages');
      }
    } catch (err) {
      setError('Server error while fetching messages');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(currentPage);
  }, [currentPage]);

  const confirmDelete = async () => {
    if (!messageToDelete) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/contact/${messageToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDeleteModalOpen(false);
        setMessageToDelete(null);
        
        fetchMessages(currentPage);
      } else {
        alert(data.message || 'Failed to delete message');
      }
    } catch (err) {
      console.error('Delete error', err);
      alert('Server error while deleting message');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden"
    >
      <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-900">Contact Messages</h2>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">{totalMessages} Total</span>
      </div>
      
      {error && <div className="p-6 text-red-500 font-medium">{error}</div>}
      
      {loading ? (
        <div className="p-10 flex justify-center">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      ) : messages.length === 0 ? (
        <div className="p-10 text-center text-gray-500">No contact messages received yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Name</th>
                <th className="p-4">Concern</th>
                <th className="p-4">Details</th>
                <th className="p-4 pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 pl-6 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(msg.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900 text-sm">{msg.fullName}</div>
                  </td>
                  <td className="p-4">
                    <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100 whitespace-nowrap">
                      {msg.concern}
                    </span>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-600 max-w-sm">
                      {msg.details.split(' ').slice(0, 6).join(' ')}{msg.details.split(' ').length > 6 ? '...' : ''}
                    </p>
                  </td>
                  <td className="p-4 pr-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setMessageToView(msg);
                          setViewModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Message"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => {
                          setMessageToDelete(msg._id);
                          setDeleteModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Message"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing Page <span className="font-bold text-gray-900">{currentPage}</span> of <span className="font-bold text-gray-900">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* View Message Modal */}
      {viewModalOpen && messageToView && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setViewModalOpen(false)}
          ></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-3xl p-8 max-w-lg w-full border border-gray-100 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-bold text-gray-900">Message Details</h3>
              <button 
                onClick={() => setViewModalOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="space-y-4 mb-8">
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Name</p>
                <p className="font-medium text-gray-900">{messageToView.fullName}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</p>
                  <a href={`mailto:${messageToView.email}`} className="font-medium text-purple-600 hover:underline break-all">{messageToView.email}</a>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone Number</p>
                  <a href={`tel:${messageToView.phone}`} className="font-medium text-purple-600 hover:underline">{messageToView.phone}</a>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Concern</p>
                <span className="inline-block bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100">
                  {messageToView.concern}
                </span>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Full Message</p>
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 text-gray-700 text-sm whitespace-pre-wrap">
                  {messageToView.details}
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => setViewModalOpen(false)}
              className="w-full bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => !isDeleting && setDeleteModalOpen(false)}
          ></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full border border-gray-100 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <FiAlertCircle className="text-3xl text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Message</h3>
              <p className="text-gray-500 mb-8">Are you sure you want to delete this message? This action cannot be undone.</p>
              
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </motion.div>
  );
};

const JoiningRequestTab = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [requestToView, setRequestToView] = useState(null);
  const [activeModalStep, setActiveModalStep] = useState(1);
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);

  const fetchRequests = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/join-requests?page=${page}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setRequests(data.data);
        setTotalPages(data.totalPages || 1);
        setTotalRequests(data.total || 0);
      } else {
        setError(data.message || 'Failed to fetch requests');
      }
    } catch (err) {
      setError('Server error while fetching requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests(currentPage);
  }, [currentPage]);

  const confirmDelete = async () => {
    if (!requestToDelete) return;
    setIsDeleting(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/join-requests/${requestToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDeleteModalOpen(false);
        setRequestToDelete(null);
        fetchRequests(currentPage);
      } else {
        alert(data.message || 'Failed to delete request');
      }
    } catch (err) {
      console.error('Delete error', err);
      alert('Server error while deleting request');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    setIsStatusUpdating(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/join-requests/${id}/status`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await response.json();
      if (data.success) {
        setRequests(prev => prev.map(req => req._id === id ? { ...req, status: newStatus } : req));
        setViewModalOpen(false);
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (err) {
      alert('Server error while updating status');
    } finally {
      setIsStatusUpdating(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden"
    >
      {loading ? (
        <div className="p-10 flex justify-center">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      ) : requests.length === 0 ? (
        <div className="p-10 text-center text-gray-500">No joining requests received yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Name</th>
                <th className="p-4">City</th>
                <th className="p-4">Skills</th>
                <th className="p-4 pr-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr 
                  key={req._id} 
                  className={`border-b border-gray-50 transition-colors ${
                    req.status === 'accepted' ? 'bg-green-50/50 hover:bg-green-50' : 
                    req.status === 'rejected' ? 'bg-red-50/50 hover:bg-red-50' : 
                    'hover:bg-gray-50/50'
                  }`}
                >
                  <td className="p-4 pl-6 text-sm text-gray-500 whitespace-nowrap">
                    {new Date(req.createdAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric'
                    })}
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-gray-900 text-sm">{req.fullName}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm font-medium text-gray-600">{req.city}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-1 flex-wrap">
                      {req.selectedSkills.map(skill => (
                        <span key={skill} className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md text-[10px] font-bold border border-indigo-100 uppercase">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 pr-6">
                    <div className="flex gap-2">
                      <button 
                        onClick={() => {
                          setRequestToView(req);
                          setActiveModalStep(1);
                          setViewModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Application"
                      >
                        <FiEye />
                      </button>
                      <button 
                        onClick={() => {
                          setRequestToDelete(req._id);
                          setDeleteModalOpen(true);
                        }}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Application"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="p-4 border-t border-gray-100 bg-white flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing Page <span className="font-bold text-gray-900">{currentPage}</span> of <span className="font-bold text-gray-900">{totalPages}</span>
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {viewModalOpen && requestToView && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => setViewModalOpen(false)}
          ></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-3xl p-8 max-w-2xl w-full border border-gray-100 shadow-2xl max-h-[90vh] flex flex-col"
          >
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-2xl font-bold text-gray-900">Application Details</h3>
              <button 
                onClick={() => setViewModalOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
              >
                <FiX className="text-xl" />
              </button>
            </div>
            
            <div className="overflow-y-auto flex-1 pr-2 pb-4 mt-2">
              {activeModalStep === 1 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Personal Info</h4>
                  
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Name</p>
                      <p className="font-medium text-gray-900">{requestToView.fullName}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Mobile</p>
                      <a href={`tel:${requestToView.mobile}`} className="font-medium text-purple-600 hover:underline">{requestToView.mobile}</a>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Email</p>
                      <a href={`mailto:${requestToView.email}`} className="font-medium text-purple-600 hover:underline break-all">{requestToView.email}</a>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">City</p>
                      <p className="font-medium text-gray-900">{requestToView.city}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Nearby Cities</p>
                    <p className="font-medium text-gray-900">{requestToView.nearbyCities || 'None'}</p>
                  </div>
                  
                  <div className="flex justify-between items-center gap-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Portfolio</p>
                      <a href={requestToView.portfolioLink} target="_blank" rel="noreferrer" className="font-medium text-purple-600 hover:underline break-all">{requestToView.portfolioLink || 'N/A'}</a>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Social Page</p>
                      <a href={requestToView.socialPage} target="_blank" rel="noreferrer" className="font-medium text-purple-600 hover:underline break-all">{requestToView.socialPage || 'N/A'}</a>
                    </div>
                  </div>
                </div>
              )}

              {activeModalStep === 2 && (
                <div className="space-y-6">
                  <h4 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-2 mb-4">Professional Info</h4>
                  
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Selected Roles</p>
                    <div className="flex gap-2 flex-wrap">
                      {requestToView.selectedSkills.map(skill => (
                        <span key={skill} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-bold border border-purple-100 uppercase tracking-wide">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {requestToView.selectedSkills.includes('photographer') && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-3">Photographer Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="font-bold text-gray-500">Categories:</span> {requestToView.photographerCategories?.join(', ') || 'N/A'}</div>
                        <div><span className="font-bold text-gray-500">Experience:</span> {requestToView.photographerExperience || 'N/A'}</div>
                        <div><span className="font-bold text-gray-500">Level:</span> {requestToView.photographerSkillLevel || 'N/A'}</div>
                        <div className="col-span-2"><span className="font-bold text-gray-500">Cameras:</span> {requestToView.photographerCameras || 'N/A'}</div>
                        <div className="col-span-2"><span className="font-bold text-gray-500">Equipment:</span> {requestToView.photographerEquipments || 'N/A'}</div>
                      </div>
                    </div>
                  )}

                  {requestToView.selectedSkills.includes('photo-editor') && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-3">Photo Editor Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="col-span-2"><span className="font-bold text-gray-500">Categories:</span> {requestToView.photoEditorCategories?.join(', ') || 'N/A'}</div>
                        <div className="col-span-2"><span className="font-bold text-gray-500">Software:</span> {requestToView.photoEditorSoftwares || 'N/A'}</div>
                      </div>
                    </div>
                  )}

                  {requestToView.selectedSkills.includes('videographer') && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-3">Videographer Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div><span className="font-bold text-gray-500">Categories:</span> {requestToView.videographerCategories?.join(', ') || 'N/A'}</div>
                        <div><span className="font-bold text-gray-500">Experience:</span> {requestToView.videographerExperience || 'N/A'}</div>
                        <div><span className="font-bold text-gray-500">Level:</span> {requestToView.videographerSkillLevel || 'N/A'}</div>
                        <div className="col-span-2"><span className="font-bold text-gray-500">Cameras:</span> {requestToView.videographerCameras || 'N/A'}</div>
                        <div className="col-span-2"><span className="font-bold text-gray-500">Equipment:</span> {requestToView.videographerEquipments || 'N/A'}</div>
                        <div className="col-span-2"><span className="font-bold text-gray-500">Software:</span> {requestToView.videographerSoftwares || 'N/A'}</div>
                      </div>
                    </div>
                  )}

                  {requestToView.selectedSkills.includes('video-editor') && (
                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-gray-900 mb-3">Video Editor Details</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="col-span-2"><span className="font-bold text-gray-500">Categories:</span> {requestToView.videoEditorCategories?.join(', ') || 'N/A'}</div>
                        <div className="col-span-2"><span className="font-bold text-gray-500">Software:</span> {requestToView.videoEditorSoftwares || 'N/A'}</div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeModalStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                      <h4 className="text-xl font-bold text-gray-900">Uploaded Files</h4>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-bold">
                        {requestToView.uploadedPhotos?.length || 0} Total
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {requestToView.uploadedPhotos && requestToView.uploadedPhotos.length > 0 ? (
                        requestToView.uploadedPhotos.map((photo, idx) => (
                          <div 
                            key={idx} 
                            onClick={() => setFullscreenImage(photo)}
                            className="bg-white hover:bg-gray-50 border border-gray-200 p-2 rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer group shadow-sm hover:shadow-md"
                          >
                            <div className="w-full aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
                              <img loading="lazy" src={photo} alt={`Upload ${idx+1}`} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-gray-900 text-[10px] font-bold px-2 py-1 rounded-md shadow-sm transition-opacity">
                                  View
                                </span>
                              </div>
                            </div>
                            <span className="font-bold text-xs text-gray-600">Image {idx + 1}</span>
                          </div>
                        ))
                      ) : (
                        <div className="col-span-full text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                          <span className="text-sm text-gray-500">No files uploaded</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-4 pt-6 border-t border-gray-100 mt-4">
              {activeModalStep > 1 && (
                <button 
                  onClick={() => setActiveModalStep(prev => prev - 1)}
                  className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all"
                >
                  Back
                </button>
              )}
              
              {activeModalStep < 3 && (
                <button 
                  onClick={() => setActiveModalStep(prev => prev + 1)}
                  className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all"
                >
                  Next
                </button>
              )}

              {activeModalStep === 3 && (
                <>
                  <button 
                    onClick={() => handleStatusChange(requestToView._id, 'rejected')}
                    disabled={isStatusUpdating}
                    className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
                  >
                    Reject
                  </button>
                  <button 
                    onClick={() => handleStatusChange(requestToView._id, 'accepted')}
                    disabled={isStatusUpdating}
                    className="flex-1 bg-green-50 hover:bg-green-100 text-green-600 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
                  >
                    Accept
                  </button>
                  <button 
                    onClick={() => setViewModalOpen(false)}
                    className="flex-1 bg-gray-900 hover:bg-black text-white font-bold py-3.5 rounded-xl transition-all"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}

      <AnimatePresence>
        {fullscreenImage && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
              onClick={() => setFullscreenImage(null)}
            ></div>
            
            <button 
              onClick={() => setFullscreenImage(null)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[210]"
            >
              <FiX className="text-2xl" />
            </button>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative z-[210] max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
            >
              <img loading="lazy" src={fullscreenImage} 
                alt="Fullscreen" 
                className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl" 
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {deleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
            onClick={() => !isDeleting && setDeleteModalOpen(false)}
          ></div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-white rounded-3xl p-8 max-w-md w-full border border-gray-100 shadow-2xl"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <FiAlertCircle className="text-3xl text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Request</h3>
              <p className="text-gray-500 mb-8">Are you sure you want to delete this joining request? This action cannot be undone.</p>
              
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setDeleteModalOpen(false)}
                  disabled={isDeleting}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmDelete}
                  disabled={isDeleting}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

    </motion.div>
  );
};

const DashboardContent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await fetch('http://localhost:5000/api/dashboard/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Bookings', value: data?.stats?.totalBookings || 0, icon: FiCalendar, color: 'text-purple-500', bg: 'bg-purple-100', trend: '+5%', tColor: 'text-emerald-500' },
    { title: 'Unread Messages', value: data?.stats?.unreadMessages || 0, icon: FiMessageSquare, color: 'text-indigo-500', bg: 'bg-indigo-100', trend: data?.stats?.unreadMessages > 0 ? 'Needs Attention' : 'All Clear', tColor: data?.stats?.unreadMessages > 0 ? 'text-amber-500' : 'text-emerald-500' },
    { title: 'Photographers', value: data?.stats?.totalPhotographers || 0, icon: FiCamera, color: 'text-blue-500', bg: 'bg-blue-100', trend: 'Active', tColor: 'text-emerald-500' },
    { title: 'Published Blogs', value: data?.stats?.publishedBlogs || 0, icon: FiFileText, color: 'text-pink-500', bg: 'bg-pink-100', trend: 'Live', tColor: 'text-emerald-500' },
  ];

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHrs = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHrs > 0) return `${diffHrs}h ago`;
    if (diffMins > 0) return `${diffMins}m ago`;
    return 'Just now';
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 cursor-pointer group overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full ${stat.bg} opacity-20 -mr-4 -mt-4 transition-transform group-hover:scale-110`}></div>
            <div className="flex justify-between items-start relative z-10">
              <div>
                <p className="text-gray-500 text-sm font-bold uppercase tracking-wider">{stat.title}</p>
                <h3 className="text-4xl font-black text-gray-900 mt-2 tracking-tight">{stat.value}</h3>
              </div>
              <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner`}>
                <stat.icon className={`text-2xl ${stat.color}`} />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-1.5 text-sm relative z-10 font-medium">
              <span className={`${stat.tColor} flex items-center bg-gray-50 px-2 py-1 rounded-md`}>
                {stat.trend.includes('%') && <FiTrendingUp className="mr-1" />}
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
          <h2 className="text-xl font-black text-gray-900 flex items-center gap-2"><FiSearch className="text-gray-400" /> Recent Activity</h2>
        </div>
        <div className="p-0">
          {(!data?.recentActivity || data.recentActivity.length === 0) ? (
            <div className="p-8 text-center text-gray-500 font-medium">No recent activity</div>
          ) : (
            data.recentActivity.map((activity, i) => (
              <div key={activity._id} className="flex items-center gap-5 p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer group">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${activity.type === 'booking' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  {activity.type === 'booking' ? <FiCalendar className="text-xl" /> : <FiMessageSquare className="text-xl" />}
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-bold text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500 font-medium">{activity.subtitle}</p>
                </div>
                <span className="text-xs font-bold text-gray-400 bg-white px-3 py-1.5 rounded-lg border border-gray-100 shadow-sm">{formatTimeAgo(activity.createdAt)}</span>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [contactCount, setContactCount] = useState(0);
  const [joinCount, setJoinCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    } else {
      setIsAuthenticated(true);
      fetchNotificationCounts(token);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (activeTab === 'Contact Inbox' && contactCount > 0) {
      markContactsAsRead(token);
    }
    if (activeTab === 'Joining Request' && joinCount > 0) {
      markJoinRequestsAsRead(token);
    }
  }, [activeTab, contactCount, joinCount]);

  const fetchNotificationCounts = async (token) => {
    try {
      const [contactRes, joinRes, bookingRes] = await Promise.all([
        fetch('http://localhost:5000/api/contact/unread', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/join-requests/unread', { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch('http://localhost:5000/api/bookings/unread', { headers: { 'Authorization': `Bearer ${token}` } })
      ]);
      
      const contactData = await contactRes.json();
      const joinData = await joinRes.json();
      const bookingData = await bookingRes.json();

      if (contactData.success) setContactCount(contactData.count || 0);
      if (joinData.success) setJoinCount(joinData.count || 0);
      if (bookingData.success) setBookingCount(bookingData.count || 0);
    } catch (err) {
      console.error('Failed to fetch notification counts', err);
    }
  };

  const markContactsAsRead = async (token) => {
    try {
      await fetch('http://localhost:5000/api/contact/mark-read', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setContactCount(0);
    } catch (err) {
      console.error('Failed to mark contacts as read', err);
    }
  };

  const markJoinRequestsAsRead = async (token) => {
    try {
      await fetch('http://localhost:5000/api/join-requests/mark-read', {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setJoinCount(0);
    } catch (err) {
      console.error('Failed to mark join requests as read', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (!isAuthenticated) return null;

  const sidebarLinks = [
    { name: 'Dashboard', icon: FiHome },
    { name: 'Blogs', icon: FiFileText },
    { name: 'Contact Inbox', icon: FiPhone },
    { name: 'Photographers', icon: FiCamera },
    { name: 'Bookings', icon: FiCalendar },
    { name: 'Creator Applications', icon: FiUserPlus },
    { name: 'Setting', icon: FiSettings },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden font-sans">
      
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm z-10 hidden md:flex">
        <div className="p-6 pt-8 flex justify-center items-center">
          <img loading="lazy" src={logo} alt="FlashMe" className="h-12 w-auto object-contain" />
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeTab === link.name;
            const linkCount = link.name === 'Contact Inbox' ? contactCount : link.name === 'Creator Applications' ? joinCount : link.name === 'Bookings' ? bookingCount : 0;
            
            return (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`w-full flex justify-between items-center px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                  isActive 
                    ? 'bg-purple-50 text-purple-700' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`text-lg ${isActive ? 'text-purple-600' : 'text-gray-400'}`} />
                  {link.name}
                </div>
                {linkCount > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {linkCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all font-medium group"
          >
            <FiLogOut className="text-lg text-gray-400 group-hover:text-red-500" />
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-100 w-96 focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-300 transition-all">
            <FiSearch className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search bookings, users..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:bg-gray-50 rounded-full transition-colors flex items-center justify-center">
              <FiBell className="text-xl" />
              {(contactCount + joinCount + bookingCount) > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white min-w-[1.25rem] text-center">
                  {contactCount + joinCount + bookingCount}
                </span>
              )}
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">Superadmin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-100 to-indigo-100 flex items-center justify-center border border-purple-200 text-purple-700 font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full">
          {activeTab !== 'Photographers' && activeTab !== 'Bookings' && activeTab !== 'Blogs' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-end mb-8"
            >
              <div>
                <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">{activeTab}</h1>
                <p className="text-gray-500 mt-1">
                  {activeTab === 'Dashboard' ? "Here's what's happening today." : `Manage your ${activeTab.toLowerCase()} here.`}
                </p>
              </div>
              {activeTab === 'Dashboard' && (
                <button className="bg-gray-900 text-white px-5 py-2.5 rounded-xl font-medium shadow-sm hover:bg-gray-800 transition-colors text-sm">
                  Generate Report
                </button>
              )}
            </motion.div>
          )}

          {activeTab === 'Dashboard' && <DashboardContent />}
          {activeTab === 'Contact Inbox' && <ContactTab />}
          {activeTab === 'Creator Applications' && <JoiningRequestTab />}
          {activeTab === 'Blogs' && <BlogsTab />}
          {activeTab === 'Photographers' && <PhotographersTab />}
          {activeTab === 'Bookings' && <BookingsTab />}
          {activeTab === 'Setting' && <SettingsTab />}
          
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
