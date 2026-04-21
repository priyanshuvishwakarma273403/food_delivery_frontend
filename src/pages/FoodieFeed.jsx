import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Heart, MessageCircle, Share2, Award, Sparkles } from 'lucide-react';
import apiClient from '../api/axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

const FoodieFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const [isUploading, setIsUploading] = useState(false);
  const [caption, setCaption] = useState('');

  useEffect(() => {
    fetchFeed();
  }, []);

  const fetchFeed = async () => {
    try {
      const response = await apiClient.get('/social/feed');
      if (response.data.success) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error('Failed to fetch feed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePost = async () => {
    if (!caption.trim()) return;
    setIsUploading(true);
    
    // Mock image for demo purposes
    const mockImage = "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800";

    try {
      const response = await apiClient.post('/social/post', null, {
        params: {
          userId: user.id,
          imageUrl: mockImage,
          caption: caption
        }
      });
      if (response.data.success) {
        toast.success("50 Coins Awarded! 🪙", {
          icon: '🎁',
          duration: 5000,
        });
        setCaption('');
        fetchFeed();
      }
    } catch (error) {
      toast.error("Failed to share your food moment");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }}
            className="inline-block p-4 bg-primary/10 rounded-3xl mb-4"
          >
            <Camera size={40} className="text-primary" />
          </motion.div>
          <h1 className="text-4xl font-black text-text-primary mb-2">Foodie Community</h1>
          <p className="text-text-secondary font-bold">Share your meal, earn rewards! 🪙</p>
        </div>

        {/* Share Section */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-premium border border-gray-100 mb-12">
          <div className="flex gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-black text-primary">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="flex-1">
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="What's on your plate today?"
                className="w-full bg-gray-50 border-none rounded-2xl p-4 text-sm font-bold focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
              />
              <div className="flex items-center justify-between mt-4">
                <button className="flex items-center gap-2 text-primary font-bold text-sm px-4 py-2 hover:bg-primary/5 rounded-xl transition-colors">
                  <Camera size={20} /> Add Photo
                </button>
                <button
                  onClick={handlePost}
                  disabled={isUploading || !caption.trim()}
                  className="bg-primary text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-primary/20 hover:scale-105 transition-transform disabled:opacity-50"
                >
                  {isUploading ? 'Sharing...' : 'Post & Earn 50 🪙'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed */}
        <div className="space-y-8">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] shadow-premium border border-gray-100 overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600">
                    {post.user?.name?.[0]}
                  </div>
                  <div>
                    <h3 className="font-black text-sm">{post.user?.name}</h3>
                    <p className="text-[10px] text-text-secondary font-bold">Food Enthusiast</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                  <Award size={12} /> Reward Earned
                </div>
              </div>

              <img src={post.imageUrl} alt="Food" className="w-full h-[400px] object-cover" />

              <div className="p-6">
                <p className="text-sm font-bold text-text-primary mb-6 leading-relaxed">
                  {post.caption}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <div className="flex gap-6">
                    <button className="flex items-center gap-2 text-text-secondary hover:text-red-500 transition-colors">
                      <Heart size={20} /> <span className="text-xs font-black">24</span>
                    </button>
                    <button className="flex items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                      <MessageCircle size={20} /> <span className="text-xs font-black">12</span>
                    </button>
                    <button className="flex items-center gap-2 text-text-secondary hover:text-blue-500 transition-colors">
                      <Share2 size={20} />
                    </button>
                  </div>
                  <div className="flex items-center gap-1 text-primary">
                    <Sparkles size={16} />
                    <span className="text-[10px] font-black uppercase">Trending</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodieFeed;
