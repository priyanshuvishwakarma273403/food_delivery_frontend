import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  Power,
  Image as ImageIcon,
  Star,
  ArrowLeft,
  ChevronDown,
  Eye,
  UtensilsCrossed,
  Upload,
  RefreshCcw
} from 'lucide-react';

import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import { toast } from 'react-hot-toast';
import restaurantService from '../services/restaurantService';
import mediaService from '../services/mediaService';
import { getOptimizedImageUrl } from '../utils/cloudinary';


const AdminRestaurants = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '', cuisineType: '', imageUrl: '', rating: '4.0', avgDeliveryTime: '30', address: '', city: 'Noida', phone: '', minOrderAmount: '300'
  });

  // Fetch Restaurants
  const { data: response, isLoading, refetch } = useQuery({
    queryKey: ['admin-restaurants'],
    queryFn: () => restaurantService.getAllRestaurants()
  });

  const restaurants = response?.data || [];

  // Create/Update Mutation
  const saveMutation = useMutation({
    mutationFn: (data) => isEditing 
      ? restaurantService.updateRestaurant(editingId, data) 
      : restaurantService.createRestaurant(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-restaurants']);
      queryClient.invalidateQueries(['restaurants']);
      toast.success(isEditing ? 'Restaurant updated!' : 'Restaurant added!');
      setShowModal(false);
      resetForm();
    },
    onError: () => toast.error('Failed to save restaurant')
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => restaurantService.deleteRestaurant(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-restaurants']);
      toast.success('Restaurant removed');
    }
  });

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const loadingToast = toast.loading('Uploading to Cloudinary...');
      const response = await mediaService.uploadImage(file);
      toast.dismiss(loadingToast);
      
      if (response.success) {
        setFormData(prev => ({ ...prev, imageUrl: response.data.url }));
        toast.success('Image uploaded!');
      }
    } catch (error) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const toggleStatus = async (res) => {
    try {
      await restaurantService.updateRestaurant(res.id, { ...res, open: !res.open });
      queryClient.invalidateQueries(['admin-restaurants']);
      toast.success('Status updated');
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deleteRestaurant = (id) => {
    if (window.confirm('Are you sure you want to remove this restaurant?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveMutation.mutate({
      ...formData,
      rating: parseFloat(formData.rating),
      avgDeliveryTime: parseInt(formData.avgDeliveryTime),
      minOrderAmount: parseFloat(formData.minOrderAmount),
      open: true
    });
  };

  const startEdit = (res) => {
    setIsEditing(true);
    setEditingId(res.id);
    setFormData({
      name: res.name,
      cuisineType: res.cuisineType,
      imageUrl: res.imageUrl,
      rating: String(res.rating || 4.0),
      avgDeliveryTime: String(res.avgDeliveryTime || 30),
      address: res.address || '',
      city: res.city || 'Noida',
      phone: res.phone || '',
      minOrderAmount: String(res.minOrderAmount || 300),
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({ name: '', cuisineType: '', imageUrl: '', rating: '4.0', avgDeliveryTime: '30', address: '', city: 'Noida', phone: '', minOrderAmount: '300' });
    setIsEditing(false);
    setEditingId(null);
  };

  const filtered = restaurants.filter(r => 
    r.name?.toLowerCase().includes(search.toLowerCase()) || 
    r.cuisineType?.toLowerCase().includes(search.toLowerCase())
  );

  const activeCount = restaurants.filter(r => r.open).length;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 lg:px-12 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="h-10 w-10 bg-gray-100 rounded-xl flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-text-primary">Manage Restaurants</h1>
              <p className="text-text-secondary text-xs md:text-sm font-medium">
                {isLoading ? 'Loading...' : `${restaurants.length} total · ${activeCount} active · ${restaurants.length - activeCount} offline`}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search restaurants..." 
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button onClick={() => { setIsEditing(false); resetForm(); setShowModal(true); }} className="rounded-xl shrink-0 px-4 md:px-8 text-sm">
              <Plus size={18} className="mr-1.5" /> Add
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-4 md:py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
          {[
            { label: 'Total Restaurants', value: restaurants.length, icon: <UtensilsCrossed size={18} />, color: 'bg-blue-50 text-blue-600' },
            { label: 'Active Now', value: activeCount, icon: <Power size={18} />, color: 'bg-green-50 text-green-600' },
            { label: 'Avg Rating', value: restaurants.length > 0 ? (restaurants.reduce((a, r) => a + (r.rating || 0), 0) / restaurants.length).toFixed(1) : '0.0', icon: <Star size={18} />, color: 'bg-orange-50 text-orange-600' },
            { label: 'Offline', value: restaurants.length - activeCount, icon: <Eye size={18} />, color: 'bg-purple-50 text-purple-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-4 md:p-5 border border-gray-100 shadow-sm">
              <div className={`h-8 w-8 md:h-10 md:w-10 ${stat.color} rounded-xl flex items-center justify-center mb-2 md:mb-3`}>
                {stat.icon}
              </div>
              <p className="text-lg md:text-2xl font-black text-text-primary">{stat.value}</p>
              <p className="text-[10px] md:text-xs text-text-secondary font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {isLoading ? (
             Array(6).fill(0).map((_, i) => (
               <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-2xl" />
             ))
          ) : (
            <AnimatePresence>
              {filtered.map((res) => (
                <motion.div
                  key={res.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white rounded-2xl md:rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group"
                >
                  <div className="relative h-36 md:h-48">
                    <img src={getOptimizedImageUrl(res.imageUrl || res.image, { width: 400, height: 250 })} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={res.name} loading="lazy" />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <button onClick={() => toggleStatus(res)} className={`h-8 w-8 md:h-10 md:w-10 rounded-xl flex items-center justify-center backdrop-blur-md transition-all ${res.open ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`}>
                        <Power size={16} />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-lg md:text-xl font-bold text-white truncate">{res.name}</h3>
                      <p className="text-xs font-medium text-white/80 truncate">{res.cuisineType}</p>
                    </div>
                  </div>
                  
                  <div className="p-4 md:p-6">
                    <div className="flex items-center justify-between mb-4 md:mb-6">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 md:h-8 md:w-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                          <Star size={14} fill="currentColor" />
                        </div>
                        <span className="text-xs md:text-sm font-bold">{res.rating}</span>
                      </div>
                      <Badge variant={res.open ? 'success' : 'error'} className="text-[10px] md:text-xs">
                        {res.open ? 'Active' : 'Offline'}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-text-secondary mb-4">
                      <span>{res.avgDeliveryTime} min delivery</span>
                      <span>·</span>
                      <span>{res.city}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 md:gap-3">
                      <button onClick={() => startEdit(res)} className="flex items-center justify-center gap-1.5 py-2.5 md:py-3 bg-gray-50 hover:bg-primary/5 text-text-secondary hover:text-primary rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all border border-gray-100">
                        <Edit3 size={14} /> Edit
                      </button>
                      <button onClick={() => deleteRestaurant(res.id)} className="flex items-center justify-center gap-1.5 py-2.5 md:py-3 bg-gray-50 hover:bg-red-50 text-text-secondary hover:text-red-500 rounded-xl md:rounded-2xl font-bold text-xs md:text-sm transition-all border border-gray-100">
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {!isLoading && filtered.length === 0 && (
          <div className="text-center py-16">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">No restaurants found</h3>
            <p className="text-text-secondary text-sm">Try a different search term</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-white rounded-2xl md:rounded-[3rem] p-6 md:p-14 w-full max-w-2xl relative z-10 shadow-2xl overflow-y-auto max-h-[90vh]"
          >
             <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-bl-[100px] hidden md:block" />
             
             <h2 className="text-xl md:text-3xl font-black text-text-primary mb-1 md:mb-2">{isEditing ? 'Edit Restaurant' : 'Add New Restaurant'}</h2>
             <p className="text-text-secondary text-sm mb-6 md:mb-10">This restaurant will appear on the main page for customers</p>
             
             <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Input label="Restaurant Name" placeholder="e.g. Pizza Palace" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                  <Input label="Cuisine Types" placeholder="Italian, Fast Food" value={formData.cuisineType} onChange={(e) => setFormData({...formData, cuisineType: e.target.value})} required />
                </div>
                <div className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Input 
                      label="Cover Image URL" 
                      placeholder="https://images.unsplash.com/..." 
                      icon={ImageIcon}
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                    />
                  </div>
                  <label className="shrink-0 h-[46px] px-4 bg-gray-50 hover:bg-primary/10 text-text-secondary hover:text-primary rounded-xl flex items-center justify-center cursor-pointer transition-all border border-gray-100 font-bold text-xs">
                    {uploading ? (
                      <div className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin mr-2" />
                    ) : (
                      <Upload size={14} className="mr-1.5" />
                    )}
                    {uploading ? 'Uploading...' : 'Upload Image'}
                    <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
                  </label>
                </div>
                {formData.imageUrl && (
                  <div className="h-32 rounded-2xl overflow-hidden border border-gray-100 relative group">
                    <img src={getOptimizedImageUrl(formData.imageUrl, { width: 400 })} className="w-full h-full object-cover" alt="Preview" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <p className="text-white text-[10px] font-bold">Cloudinary Optimized Preview</p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Input label="Address" placeholder="Sector 62, Noida" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} required />
                  <Input label="City" placeholder="Noida" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Input label="Phone Number" placeholder="9988776655" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                  <Input label="Rating" type="number" step="0.1" min="1" max="5" placeholder="4.5" value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <Input label="Avg Delivery Time (min)" type="number" placeholder="30" value={formData.avgDeliveryTime} onChange={(e) => setFormData({...formData, avgDeliveryTime: e.target.value})} />
                  <Input label="Min Order Amount (₹)" type="number" placeholder="300" value={formData.minOrderAmount} onChange={(e) => setFormData({...formData, minOrderAmount: e.target.value})} />
                </div>
                
                <div className="flex gap-3 md:gap-4 pt-4 md:pt-8">
                  <Button type="button" variant="ghost" className="flex-1 rounded-xl md:rounded-2xl" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button type="submit" className="flex-[2] rounded-xl md:rounded-2xl py-3 md:py-4 shadow-xl shadow-primary/20" disabled={saveMutation.isLoading}>
                    {saveMutation.isLoading ? 'Saving...' : (isEditing ? 'Save Changes' : 'Add Restaurant')}
                  </Button>
                </div>
             </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminRestaurants;
