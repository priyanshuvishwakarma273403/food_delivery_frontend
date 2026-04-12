import { useState } from 'react';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Trash2, 
  Edit3, 
  Power,
  Image as ImageIcon,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import { toast } from 'react-hot-toast';

const AdminRestaurants = () => {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'The Burger King', cuisine: 'American, Fast Food', rating: 4.5, isOpen: true, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80' },
    { id: 2, name: 'Spice Garden', cuisine: 'North Indian', rating: 4.2, isOpen: true, image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&q=80' },
    { id: 3, name: 'Sushi Zen', cuisine: 'Japanese', rating: 4.8, isOpen: false, image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&q=80' },
  ]);

  const toggleStatus = (id) => {
    setRestaurants(prev => prev.map(r => 
      r.id === id ? { ...r, isOpen: !r.isOpen } : r
    ));
    toast.success('Restaurant status updated');
  };

  const deleteRestaurant = (id) => {
    if (window.confirm('Are you sure you want to remove this restaurant?')) {
      setRestaurants(prev => prev.filter(r => r.id !== id));
      toast.success('Restaurant removed');
    }
  };

  const filtered = restaurants.filter(r => 
    r.name.toLowerCase().includes(search.toLowerCase()) || 
    r.cuisine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
           <div>
             <h1 className="text-3xl font-black text-text-primary">Manage Restaurants</h1>
             <p className="text-text-secondary font-medium">Add, update or remove restaurant partners</p>
           </div>
           
           <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                 <input 
                    type="text" 
                    placeholder="Search by name or cuisine..." 
                    className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                 />
              </div>
              <Button onClick={() => { setIsEditing(false); setShowModal(true); }} className="rounded-2xl shrink-0 px-8">
                <Plus size={20} className="mr-2" /> Add New
              </Button>
           </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           <AnimatePresence>
             {filtered.map((res) => (
                <motion.div
                   key={res.id}
                   layout
                   initial={{ opacity: 0, scale: 0.9 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0, scale: 0.9 }}
                   className="bg-white rounded-[2.5rem] overflow-hidden shadow-premium border border-gray-100 group"
                >
                   <div className="relative h-48">
                      <img src={res.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={res.name} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4 flex gap-2">
                         <button onClick={() => toggleStatus(res.id)} className={`h-10 w-10 rounded-xl flex items-center justify-center backdrop-blur-md transition-all ${res.isOpen ? 'bg-green-500/80 text-white' : 'bg-red-500/80 text-white'}`}>
                            <Power size={18} />
                         </button>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                         <h3 className="text-xl font-bold text-white truncate">{res.name}</h3>
                         <p className="text-xs font-medium text-white/80">{res.cuisine}</p>
                      </div>
                   </div>
                   
                   <div className="p-6">
                      <div className="flex items-center justify-between mb-8">
                         <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-orange-50 text-orange-600 rounded-lg flex items-center justify-center">
                               <Star size={16} fill="currentColor" />
                            </div>
                            <span className="text-sm font-bold">{res.rating} Average Rating</span>
                         </div>
                         <Badge variant={res.isOpen ? 'success' : 'error'}>
                            {res.isOpen ? 'Active' : 'Offline'}
                         </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <button onClick={() => { setIsEditing(true); setShowModal(true); }} className="flex items-center justify-center gap-2 py-3.5 bg-gray-50 hover:bg-primary/5 text-text-secondary hover:text-primary rounded-2xl font-bold text-sm transition-all border border-gray-100">
                            <Edit3 size={16} /> Edit Details
                         </button>
                         <button onClick={() => deleteRestaurant(res.id)} className="flex items-center justify-center gap-2 py-3.5 bg-gray-50 hover:bg-red-50 text-text-secondary hover:text-red-500 rounded-2xl font-bold text-sm transition-all border border-gray-100">
                            <Trash2 size={16} /> Remove
                         </button>
                      </div>
                   </div>
                </motion.div>
             ))}
           </AnimatePresence>
        </div>

        {/* Modal Overlay */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-10 md:p-14 w-full max-w-2xl relative z-10 shadow-2xl overflow-hidden"
            >
               <div className="absolute top-0 right-0 h-40 w-40 bg-primary/5 rounded-bl-[100px]" />
               
               <h2 className="text-3xl font-black text-text-primary mb-2">{isEditing ? 'Edit Restaurant' : 'Add New Partner'}</h2>
               <p className="text-text-secondary mb-10">Real-time image preview via URL</p>
               
               <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); toast.success('Saved successfully!'); setShowModal(false); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Restaurant Name" placeholder="e.g. Pizza Palace" />
                    <Input label="Cuisine Types" placeholder="Italian, Fast Food" />
                  </div>
                  <Input 
                    label="Cover Image URL" 
                    placeholder="https://images.unsplash.com/..." 
                    icon={ImageIcon}
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input label="Average Rating" type="number" step="0.1" placeholder="4.5" />
                    <Input label="Average Delivery Time (mins)" type="number" placeholder="30" />
                  </div>
                  
                  <div className="flex gap-4 pt-8">
                    <Button variant="ghost" className="flex-1 rounded-2xl" onClick={() => setShowModal(false)}>Cancel</Button>
                    <Button type="submit" className="flex-[2] rounded-2xl py-4 shadow-xl shadow-primary/20">
                      {isEditing ? 'Save Changes' : 'Add Restaurant'}
                    </Button>
                  </div>
               </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminRestaurants;
