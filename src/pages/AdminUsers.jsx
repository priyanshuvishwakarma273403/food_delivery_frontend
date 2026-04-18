import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Search, 
  Trash2, 
  Shield, 
  ShieldAlert, 
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  ArrowLeft,
  MoreVertical,
  UserPlus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import userService from '../services/userService';
import { toast } from 'react-hot-toast';
import dayjs from 'dayjs';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAllUsers();
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleUpdate = async (id, role) => {
    try {
      const response = await userService.updateUserRole(id, role);
      if (response.success) {
        setUsers(prev => prev.map(u => u.id === id ? response.data : u));
        toast.success(`User role updated to ${role}`);
      }
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await userService.deleteUser(id);
      if (response.success) {
        setUsers(prev => prev.filter(u => u.id !== id));
        toast.success('User deleted');
      }
    } catch (error) {
      toast.error('Delete failed');
    }
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.phone?.includes(search)
  );

  const getRoleBadge = (role) => {
    switch (role) {
      case 'ADMIN': return <Badge variant="error" className="gap-1.5"><ShieldAlert size={12} /> Admin</Badge>;
      case 'DELIVERY_PARTNER': return <Badge variant="warning" className="gap-1.5"><Shield size={12} /> Rider</Badge>;
      case 'CUSTOMER': return <Badge variant="success" className="gap-1.5"><ShieldCheck size={12} /> Customer</Badge>;
      default: return <Badge variant="gray">{role}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-100 px-4 md:px-8 lg:px-12 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="h-12 w-12 bg-gray-100 rounded-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-text-primary">User Management</h1>
              <p className="text-text-secondary text-sm font-medium">
                Manage accounts, roles, and permissions ({users.length} users)
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search name, email, or phone..." 
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium outline-none focus:ring-4 focus:ring-primary/5 transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button className="rounded-2xl px-6 gap-2 h-12 shadow-xl shadow-primary/20">
              <UserPlus size={18} /> Invite User
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredUsers.map((user) => (
              <motion.div
                key={user.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-100 group relative overflow-hidden"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-bl-[100px] -mr-8 -mt-8" />
                
                <div className="flex items-start justify-between mb-6">
                  <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center text-xl font-black text-primary border border-gray-100">
                    {user.name?.charAt(0)}
                  </div>
                  <div className="relative group/menu">
                    <button className="h-10 w-10 bg-gray-50 hover:bg-white border border-gray-100 rounded-xl flex items-center justify-center transition-all">
                      <MoreVertical size={18} className="text-gray-400" />
                    </button>
                    
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all z-10 overflow-hidden">
                      <p className="px-4 py-2 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">Change Role</p>
                      <button onClick={() => handleRoleUpdate(user.id, 'ADMIN')} className="w-full text-left px-4 py-3 text-xs font-bold text-text-secondary hover:text-primary hover:bg-gray-50">Make Admin</button>
                      <button onClick={() => handleRoleUpdate(user.id, 'DELIVERY_PARTNER')} className="w-full text-left px-4 py-3 text-xs font-bold text-text-secondary hover:text-primary hover:bg-gray-50">Make Rider</button>
                      <button onClick={() => handleRoleUpdate(user.id, 'CUSTOMER')} className="w-full text-left px-4 py-3 text-xs font-bold text-text-secondary hover:text-primary hover:bg-gray-50">Make Customer</button>
                      <button onClick={() => handleDeleteUser(user.id)} className="w-full text-left px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 border-t border-gray-50">Delete Account</button>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-black text-text-primary leading-tight mb-1 truncate">{user.name}</h3>
                  <div className="flex items-center gap-2 mb-4">
                    {getRoleBadge(user.role)}
                    <span className="text-[10px] font-bold text-text-secondary uppercase">ID: {user.id}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-text-secondary font-medium">
                    <Mail size={14} className="text-gray-400 shrink-0" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary font-medium">
                    <Phone size={14} className="text-gray-400 shrink-0" />
                    <span>{user.phone || 'No phone'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-text-secondary font-medium">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <span className="truncate">{user.address || 'No address'}</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
                   <span className="text-[10px] font-bold text-gray-400 uppercase">Joined {dayjs(user.createdAt).format('MMM YYYY')}</span>
                   <Button variant="ghost" size="sm" className="text-[10px] font-black uppercase text-primary tracking-widest p-0 h-auto">View Activity</Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredUsers.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-6xl mb-6">👥</div>
            <h3 className="text-xl font-black text-text-primary">No users found</h3>
            <p className="text-text-secondary font-medium mt-2">Try different search terms.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
