import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiFileText, FiPlus, FiEdit2, FiTrash2, FiSearch, 
  FiX, FiChevronRight, FiChevronLeft, FiCheck, FiImage
} from 'react-icons/fi';

const BlogsTab = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  
  // Multi-step form state
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    image: '',
    author: 'FlashMeToday Team',
    status: 'Draft'
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('adminToken');
      const response = await fetch('http://localhost:5000/api/blogs?limit=50', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      setIsUploading(true);
      const token = localStorage.getItem('adminToken');
      const res = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data
      });
      const result = await res.json();
      if (result.success) {
        setFormData({ ...formData, image: result.url });
      } else {
        alert('Image upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const nextStep = () => setStep(prev => Math.min(prev + 1, 3));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const resetForm = () => {
    setStep(1);
    setFormData({
      title: '', excerpt: '', content: '', image: '', author: 'FlashMeToday Team', status: 'Draft'
    });
    setSelectedBlog(null);
  };

  const openCreateModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (blog) => {
    setFormData({
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.image,
      author: blog.author,
      status: blog.status
    });
    setSelectedBlog(blog);
    setStep(1);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    if(e) e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const url = selectedBlog 
        ? `http://localhost:5000/api/blogs/${selectedBlog._id}` 
        : 'http://localhost:5000/api/blogs';
      
      const method = selectedBlog ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        fetchBlogs();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`http://localhost:5000/api/blogs/${selectedBlog._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        fetchBlogs();
        setIsDeleteModalOpen(false);
        setSelectedBlog(null);
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100 flex items-center gap-3 min-w-[280px] focus-within:ring-2 focus-within:ring-purple-100 focus-within:border-purple-300 transition-all">
            <FiSearch className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search blogs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>
        <button 
          onClick={openCreateModal}
          className="w-full md:w-auto bg-gray-900 hover:bg-black text-white px-6 py-2.5 rounded-xl font-medium shadow-sm transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <FiPlus /> Create New Blog
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
        </div>
      ) : filteredBlogs.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-[1.5rem] border border-gray-100 shadow-sm">
          <FiFileText className="mx-auto text-5xl text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Blogs Found</h3>
          <p className="text-gray-500">Create a new blog post to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group flex flex-col">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <img loading="lazy" src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 right-3 flex gap-2">
                  <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full backdrop-blur-md shadow-sm ${blog.status === 'Published' ? 'bg-emerald-500/90 text-white' : 'bg-yellow-500/90 text-white'}`}>
                    {blog.status}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-bold text-gray-400 mb-2">{new Date(blog.createdAt).toLocaleDateString()}</div>
                <h3 className="text-lg font-black text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1">{blog.excerpt}</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                  <button 
                    onClick={() => openEditModal(blog)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-bold rounded-xl transition-colors border border-gray-200"
                  >
                    <FiEdit2 /> Edit
                  </button>
                  <button 
                    onClick={() => { setSelectedBlog(blog); setIsDeleteModalOpen(true); }}
                    className="flex items-center justify-center p-2.5 bg-red-50 hover:bg-red-100 text-red-500 rounded-xl transition-colors border border-red-100"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }} 
              animate={{ opacity: 1, scale: 1 }} 
              exit={{ opacity: 0, scale: 0.95 }} 
              className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="text-xl font-black text-gray-900">
                  {selectedBlog ? 'Edit Blog Post' : 'Create New Blog'}
                </h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                  <FiX className="text-xl" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 sm:gap-4 px-10 py-6 bg-white border-b border-gray-50">
                {[1, 2, 3].map((num) => (
                  <React.Fragment key={num}>
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= num ? 'bg-[var(--color-primary)] text-white shadow-[0_0_15px_rgba(82,62,176,0.4)] scale-110' : 'bg-gray-100 text-gray-400'}`}>
                        {num}
                      </div>
                    </div>
                    {num < 3 && (
                      <div className={`w-12 sm:w-24 h-1 rounded-full transition-all duration-500 ${step > num ? 'bg-[var(--color-primary)]' : 'bg-gray-100'}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto flex-1">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Blog Title</label>
                      <input type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm outline-none font-medium" placeholder="Enter an engaging title" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Short Excerpt</label>
                      <textarea name="excerpt" value={formData.excerpt} onChange={handleInputChange} rows="3" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm outline-none resize-none" placeholder="A brief summary of the blog post..."></textarea>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Cover Image</label>
                      
                      {!formData.image ? (
                        <div className="relative border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            disabled={isUploading}
                          />
                          <FiImage className={`text-4xl text-gray-300 mb-3 ${isUploading ? 'animate-bounce' : ''}`} />
                          <p className="text-sm font-bold text-gray-600">{isUploading ? 'Uploading...' : 'Click to upload Cover Image'}</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG, WEBP up to 5MB</p>
                        </div>
                      ) : (
                        <div className="relative mt-2 h-48 rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 group">
                          <img loading="lazy" src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => setFormData({...formData, image: ''})}
                              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transform hover:scale-105 transition-all"
                            >
                              <FiTrash2 /> Remove Image
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Full Content (Supports Markdown)</label>
                      <textarea name="content" value={formData.content} onChange={handleInputChange} rows="8" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:ring-2 focus:ring-purple-100 focus:border-purple-300 transition-all text-sm outline-none font-mono resize-none" placeholder="Write your blog content here..."></textarea>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                      <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-4">Review Details</h3>
                      <div className="space-y-3">
                        <div className="flex gap-4">
                          <span className="text-gray-500 w-20 text-sm">Title:</span>
                          <span className="font-bold text-gray-900 text-sm">{formData.title || 'Not provided'}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-gray-500 w-20 text-sm">Image:</span>
                          <span className="font-bold text-gray-900 text-sm truncate">{formData.image || 'Not provided'}</span>
                        </div>
                        <div className="flex gap-4">
                          <span className="text-gray-500 w-20 text-sm">Content:</span>
                          <span className="font-bold text-gray-900 text-sm">{formData.content ? `${formData.content.substring(0, 50)}...` : 'Not provided'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3">Publish Status</label>
                      <div className="flex gap-4">
                        <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${formData.status === 'Draft' ? 'bg-yellow-50 border-yellow-200 text-yellow-700 font-bold shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                          <input type="radio" name="status" value="Draft" checked={formData.status === 'Draft'} onChange={handleInputChange} className="hidden" />
                          Save as Draft
                        </label>
                        <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${formData.status === 'Published' ? 'bg-emerald-50 border-emerald-200 text-emerald-700 font-bold shadow-sm' : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                          <input type="radio" name="status" value="Published" checked={formData.status === 'Published'} onChange={handleInputChange} className="hidden" />
                          Publish Now
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center">
                <div className="w-[100px]">
                  <button 
                    onClick={prevStep} 
                    className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900 shadow-sm ${step === 1 ? 'invisible' : 'visible'}`}
                  >
                    <FiChevronLeft /> Back
                  </button>
                </div>
                
                {step < 3 ? (
                  <button 
                    onClick={nextStep}
                    disabled={(step === 1 && (!formData.title || !formData.excerpt)) || (step === 2 && (!formData.image || !formData.content))}
                    className="px-6 py-2.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                  >
                    Continue <FiChevronRight />
                  </button>
                ) : (
                  <button 
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-[var(--color-primary)] hover:bg-[#523eb0] text-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm transition-all active:scale-95"
                  >
                    <FiCheck /> {selectedBlog ? 'Update Blog' : 'Save Blog'}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-3xl text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Blog?</h3>
              <p className="text-gray-500 text-sm mb-6">Are you sure you want to permanently delete this blog post? This action cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 px-4 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-bold rounded-xl transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-3 px-4 bg-red-500 hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm">Delete</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </motion.div>
  );
};

export default BlogsTab;
