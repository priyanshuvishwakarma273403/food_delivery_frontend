import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  UserPlus, 
  ArrowLeft,
  Briefcase,
  Bike
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuthStore } from '../store/authStore';
import OtpVerification from '../components/common/OtpVerification';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  address: z.string().min(10, 'Please enter a detailed address'),
  role: z.enum(['CUSTOMER', 'DELIVERY_PARTNER', 'ADMIN']),
});

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authView, setAuthView] = useState('default'); // 'default' or 'otp'
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: 'CUSTOMER',
    }
  });

  const selectedRole = watch('role');
  const emailValue = watch('email');
  const [formData, setFormData] = useState(null);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const dummyUser = {
          id: 'google-user-new',
          name: 'Google User',
          email: 'googleuser@example.com',
          role: selectedRole,
          address: 'Pending address...',
          phone: '',
        };
        login(dummyUser, 'dummy-google-jwt-token');
        toast.success(`Account created with Google!`);
        
        if (selectedRole === 'ADMIN') navigate('/admin');
        else if (selectedRole === 'DELIVERY_PARTNER') navigate('/delivery');
        else navigate('/');
      } catch (error) {
        toast.error('Google signup failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error('Google signup was unsuccessful.');
    }
  });

  const onSubmit = async (data) => {
    setFormData(data);
    // Proceed to OTP verification instead of immediate creation
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setAuthView('otp');
      toast.success(`Verification OTP sent to ${data.email}`);
    }, 1000);
  };

  const handleVerifyOTP = async (otp) => {
    if (otp !== '123456') { // Dummy check
      toast.error("Invalid OTP. Try '123456'");
      return;
    }
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const dummyUser = { ...formData, id: '2' };
      login(dummyUser, 'dummy-jwt-token');
      toast.success('Account verified and created successfully!');
      
      if (formData.role === 'ADMIN') navigate('/admin');
      else if (formData.role === 'DELIVERY_PARTNER') navigate('/delivery');
      else navigate('/');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = () => {
     setIsLoading(true);
     setTimeout(() => {
      setIsLoading(false);
      toast.success(`OTP resent to ${formData?.email}`);
    }, 1000);
  };

  const RoleCard = ({ value, label, icon: Icon, description }) => (
    <button
      type="button"
      onClick={() => setValue('role', value)}
      className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
        selectedRole === value 
          ? 'border-primary bg-primary/5 text-primary' 
          : 'border-gray-100 hover:border-gray-200 text-text-secondary'
      }`}
    >
      <Icon size={24} className={selectedRole === value ? 'text-primary' : 'text-gray-400'} />
      <div className="text-center">
        <p className="text-sm font-bold">{label}</p>
        <p className="text-[10px] opacity-70 leading-tight">{description}</p>
      </div>
      {selectedRole === value && (
        <div className="absolute top-2 right-2 h-4 w-4 bg-primary text-white rounded-full flex items-center justify-center">
          <div className="h-1.5 w-1.5 bg-white rounded-full" />
        </div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 py-20 overflow-hidden bg-background">
      <div className="absolute top-0 -right-20 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 -left-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card w-full max-w-2xl p-8 md:p-12 rounded-[3rem] relative"
      >
        <AnimatePresence mode="wait">
          {authView === 'default' ? (
            <motion.div
              key="register-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/login" className="absolute top-8 left-8 text-text-secondary hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium">
                <ArrowLeft size={16} /> Back to Login
              </Link>

              <div className="text-center mt-6 mb-12">
                <h1 className="text-4xl font-black text-text-primary mb-2">Create Account</h1>
                <p className="text-text-secondary">Join the Tomato food network today</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <RoleCard 
                    value="CUSTOMER" 
                    label="Customer" 
                    icon={User} 
                    description="Order food & track" 
                  />
                  <RoleCard 
                    value="DELIVERY_PARTNER" 
                    label="Rider" 
                    icon={Bike} 
                    description="Deliver & earn" 
                  />
                  <RoleCard 
                    value="ADMIN" 
                    label="Admin" 
                    icon={Briefcase} 
                    description="Manage system" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    icon={User}
                    error={errors.name?.message}
                    {...register('name')}
                  />
                  <Input
                    label="Email Address"
                    placeholder="john@example.com"
                    icon={Mail}
                    error={errors.email?.message}
                    {...register('email')}
                  />
                  <Input
                    label="Phone Number"
                    placeholder="9876543210"
                    icon={Phone}
                    error={errors.phone?.message}
                    {...register('phone')}
                  />
                  <Input
                    label="Password"
                    type="password"
                    placeholder="••••••••"
                    icon={Lock}
                    error={errors.password?.message}
                    {...register('password')}
                  />
                </div>

                <Input
                  label="Delivery Address"
                  placeholder="Complete street address, apartment, city, state"
                  icon={MapPin}
                  error={errors.address?.message}
                  {...register('address')}
                />

                <div className="flex flex-col gap-6 pt-4">
                  <p className="text-xs text-text-secondary text-center px-4">
                    By creating an account, you agree to our <span className="text-primary font-bold cursor-pointer underline">Terms of Service</span> and <span className="text-primary font-bold cursor-pointer underline">Privacy Policy</span>.
                  </p>
                  <Button
                    type="submit"
                    className="w-full py-4 text-base rounded-[25px]"
                    loading={isLoading}
                  >
                    Verify & Create Account <UserPlus size={18} className="ml-2" />
                  </Button>
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white/50 px-2 text-gray-400 font-medium">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button type="button" onClick={() => handleGoogleLogin()} className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5" alt="Google" />
                    <span className="text-sm font-medium">Google</span>
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors">
                    <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5" alt="Facebook" />
                    <span className="text-sm font-medium">Facebook</span>
                  </button>
                </div>
              </form>
            </motion.div>
          ) : (
            <div className="pt-8">
              <OtpVerification
                key="otp-view"
                email={formData?.email || emailValue}
                onVerify={handleVerifyOTP}
                onCancel={() => setAuthView('default')}
                resendOtp={handleResendOTP}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Register;
