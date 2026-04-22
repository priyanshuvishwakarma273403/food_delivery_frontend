import { useState } from 'react';
import { useBlogStore } from '../store/blogStore';
import { motion } from 'framer-motion';
import { Plus, Trash2, Edit3, X, Image as ImageIcon, Send, Upload } from 'lucide-react';
import mediaService from '../services/mediaService';
import { getOptimizedImageUrl } from '../utils/cloudinary';
import { blogService } from '../api/blogService';


import Button from '../components/common/Button';
import Input from '../components/common/Input';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

const AdminBlogs = () => {
  const { blogs, addBlog, deleteBlog } = useBlogStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    image: '',
    category: 'Festival',
  });
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const response = await mediaService.uploadImage(file);
      if (response.success) {
        setNewBlog(prev => ({ ...prev, image: response.data.url }));
        toast.success('Image uploaded!');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newBlog.title || !newBlog.content || !newBlog.image) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const blogData = {
        ...newBlog,
        author: 'Admin',
        isDraft: false,
      };
      
      const response = await blogService.createBlog(blogData);
      if (response.success) {
        addBlog(response.data);
        setIsAdding(false);
        setNewBlog({ title: '', content: '', image: '', category: 'Festival' });
        toast.success('Blog published successfully!');
        // Refresh from backend to ensure everything is in sync
        useBlogStore.getState().fetchBlogs();
      }
    } catch (err) {
      toast.error('Failed to publish blog');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this blog?')) {
      try {
        await blogService.deleteBlog(id);
        deleteBlog(id);
        toast.success('Blog deleted');
      } catch (err) {
        toast.error('Failed to delete');
      }
    }
  };


  return (
    <div className="min-h-screen pb-20 pt-16 md:pt-24 bg-gray-50/50">
      <div className="container mx-auto px-4 lg:max-w-6xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-black text-text-primary">Blog Management</h1>
            <p className="text-text-secondary">Post festival updates and announcements.</p>
          </div>
          <Button onClick={() => setIsAdding(true)} className="rounded-2xl gap-2 h-14 px-8">
            <Plus size={20} /> New Post
          </Button>
        </div>

        {/* Blog Editor Overlay */}
        {isAdding && (
          <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl p-8 md:p-10 relative overflow-hidden"
            >
              <button 
                onClick={() => setIsAdding(false)}
                className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-black mb-8">Create Announcement</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <Input 
                  label="Title" 
                  placeholder="e.g. Merry Christmas: Special Offers" 
                  value={newBlog.title}
                  onChange={e => setNewBlog({...newBlog, title: e.target.value})}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input 
                    label="Category" 
                    placeholder="e.g. Festival, Health" 
                    value={newBlog.category}
                    onChange={e => setNewBlog({...newBlog, category: e.target.value})}
                  />
                  <div className="flex gap-2 items-end">
                    <div className="flex-1">
                      <Input 
                        label="Image" 
                        placeholder="Paste URL or upload" 
                        value={newBlog.image}
                        onChange={e => setNewBlog({...newBlog, image: e.target.value})}
                      />
                    </div>
                    <label className="shrink-0 h-[46px] w-12 bg-gray-50 hover:bg-primary/10 text-text-secondary hover:text-primary rounded-xl flex items-center justify-center cursor-pointer transition-all border border-gray-100">
                      {uploading ? (
                        <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Upload size={18} />
                      )}
                      <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
                    </label>
                  </div>
                </div>

                {newBlog.image && (
                  <div className="h-32 rounded-2xl overflow-hidden border border-gray-100">
                    <img src={getOptimizedImageUrl(newBlog.image, { width: 500 })} className="w-full h-full object-cover" alt="Preview" />
                  </div>
                )}


                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-secondary">Content</label>
                  <textarea 
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-4 min-h-[150px] outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/5 transition-all"
                    placeholder="Write your blog content here..."
                    value={newBlog.content}
                    onChange={e => setNewBlog({...newBlog, content: e.target.value})}
                  />
                </div>

                <Button type="submit" className="w-full h-14 rounded-2xl gap-2 font-black">
                  <Send size={20} /> Publish Post
                </Button>
              </form>
            </motion.div>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-text-secondary">POST</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-text-secondary">CATEGORY</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-text-secondary">DATE</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-text-secondary">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img src={getOptimizedImageUrl(blog.image, { width: 100, height: 100 })} className="w-12 h-12 rounded-xl object-cover" />

                      <div>
                        <p className="font-bold text-text-primary leading-tight">{blog.title}</p>
                        <p className="text-xs text-text-secondary truncate max-w-[200px]">{blog.content}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-text-secondary font-medium">
                    {dayjs?.(blog.date).format('MMM DD, YYYY')}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2 text-gray-400 hover:text-primary transition-colors hover:bg-white rounded-lg shadow-sm">
                          <Edit3 size={18} />
                       </button>
                       <button 
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors hover:bg-white rounded-lg shadow-sm"
                       >
                          <Trash2 size={18} />
                       </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogs;
