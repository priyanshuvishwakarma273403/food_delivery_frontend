import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, CheckCircle2, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../common/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ReviewSection = ({ restaurantId, menuItemId }) => {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, [restaurantId, menuItemId]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const url = restaurantId 
        ? `/api/reviews/restaurant/${restaurantId}`
        : `/api/reviews/item/${menuItemId}`;
      const response = await axios.get(url);
      setReviews(response.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return toast.error('Please add a comment');

    try {
      setIsSubmitting(true);
      const user = JSON.parse(localStorage.getItem('user'));
      
      const reviewData = {
        restaurantId,
        menuItemId,
        userId: user?.id,
        userName: user?.name || 'Anonymous',
        rating,
        comment,
        verifiedPurchase: true // Simulation
      };

      await axios.post('/api/reviews', reviewData);
      toast.success('Review submitted successfully!');
      setComment('');
      setRating(5);
      fetchReviews();
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-12 border-t border-gray-100 pt-10">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-10">
        {/* Review Form */}
        <div className="flex-1 w-full max-w-xl">
          <h3 className="text-2xl font-black text-[#1C1C1C] mb-6">Write a Review</h3>
          <form onSubmit={handleSubmit} className="bg-gray-50 rounded-3xl p-6 md:p-8 border border-gray-100">
            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="transition-transform active:scale-90"
                  >
                    <Star
                      size={32}
                      className={cn(
                        "transition-colors duration-200",
                        (hoveredRating || rating) >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">Your Experience</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with this food/restaurant..."
                className="w-full bg-white border border-gray-100 rounded-2xl p-4 min-h-[120px] focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all text-sm font-medium"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-sm"
            >
              {isSubmitting ? 'Posting...' : 'Post Review'}
            </Button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="flex-1 w-full">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-[#1C1C1C]">Customer Reviews</h3>
            <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-2xl border border-green-100">
               <span className="text-lg font-black text-green-600">{reviews.length > 0 ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1) : '0.0'}</span>
               <Star size={18} fill="#16A34A" className="text-green-600" />
            </div>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-32 bg-gray-100 rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : reviews.length === 0 ? (
            <div className="bg-gray-50 rounded-3xl p-10 text-center border border-dashed border-gray-200">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-bold">No reviews yet. Be the first to share your experience!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review, i) => (
                <motion.div
                  key={review.id || i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                      {review.userImageUrl ? (
                        <img src={review.userImageUrl} alt={review.userName} className="w-full h-full object-cover" />
                      ) : (
                        <User size={24} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-[#1C1C1C]">{review.userName}</h4>
                        {review.verifiedPurchase && <CheckCircle2 size={14} className="text-blue-500" />}
                      </div>
                      <div className="flex mt-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star key={star} size={12} fill={star <= review.rating ? "#FBBC05" : "#E8E8E8"} strokeWidth={0} />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-[#686B78] text-sm leading-relaxed">
                    {review.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Utility function for conditional classes
function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default ReviewSection;
