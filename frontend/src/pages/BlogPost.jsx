import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await response.json();
        if (data.success) {
          setBlog(data.data);
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-[var(--color-primary)]/30 border-t-[var(--color-primary)] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center font-sans">
        <h1 className="text-4xl font-black text-gray-900 mb-4">Article Not Found</h1>
        <Link to="/blogs" className="text-[var(--color-primary)] font-bold hover:underline">
          Return to Journal
        </Link>
      </div>
    );
  }

  // Very simple Markdown-like parser for paragraphs and headers
  const formatContent = (content) => {
    return content.split('\n\n').map((paragraph, idx) => {
      if (paragraph.startsWith('### ')) {
        return <h3 key={idx} className="text-2xl font-bold text-gray-900 mt-8 mb-4">{paragraph.replace('### ', '')}</h3>;
      }
      
      // Handle bold text (e.g. **text**)
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={idx} className="mb-6 text-gray-600 text-lg leading-relaxed">
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i} className="text-gray-900">{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-24 font-sans selection:bg-[var(--color-primary)] selection:text-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link 
          to="/blogs" 
          className="inline-flex items-center gap-2 text-gray-500 hover:text-[var(--color-primary)] font-bold text-sm tracking-wide mb-10 transition-colors"
        >
          <FaArrowLeft className="text-xs" /> Back to Journal
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {blog.date || new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span className="text-[var(--color-primary)] text-sm font-bold">
              By {blog.author}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.2] mb-10">
            {blog.title}
          </h1>

          <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden mb-12 shadow-xl">
            <img 
              src={blog.image} 
              alt={blog.title} 
              className="w-full h-full object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {formatContent(blog.content)}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default BlogPost;
