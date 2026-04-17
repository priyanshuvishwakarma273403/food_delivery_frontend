import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, Smartphone } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { useAuthStore } from '../store/authStore';
import OtpVerification from '../components/common/OtpVerification';
import authService from '../services/authService';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional().or(z.literal('')),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authView, setAuthView] = useState('default'); // 'default' or 'otp'
  
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const emailValue = watch('email');

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        // You would typically send tokenResponse.access_token to your backend here
        // For demonstration, simulating successful user profile fetch & login
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const dummyUser = {
          id: 'google-user-1',
          name: 'Google User',
          email: 'googleuser@example.com',
          role: 'CUSTOMER',
        };
        const dummyToken = 'dummy-google-jwt-token';
        
        login(dummyUser, dummyToken);
        toast.success(`Welcome back, ${dummyUser.name}!`);
        navigate(from, { replace: true });
      } catch (error) {
        toast.error('Google login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      toast.error('Google login was unsuccessful.');
    }
  });

  const onSubmitPassword = async (data) => {
    setIsLoading(true);
    try {
      const response = await authService.login(data.email, data.password);
      
      if (response.success) {
        const { user: userData, accessToken } = response.data;
        login(userData, accessToken);
        toast.success(`Welcome back, ${userData.name}!`);
        navigate(from, { replace: true });
      } else {
        toast.error(response.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMsg = error.response?.data?.message || 'Invalid credentials or server error. Please try again.';
      toast.error(errorMsg);
      
      // If user not found, suggest registration (matching previous logic)
      if (error.response?.status === 404) {
        navigate('/register', { state: { email: data.email } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetOTP = async () => {
    const isEmailValid = await trigger('email');
    if (!isEmailValid) {
      toast.error('Please enter a valid email to receive OTP');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await authService.sendOtp(emailValue);
      if (response.success) {
        setAuthView('otp');
        toast.success(`Secure OTP sent successfully to ${emailValue}`);
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('OTP error:', error);
      toast.error(error.response?.data?.message || 'Failed to send OTP. Is your email registered?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    setIsLoading(true);
    try {
      // In this backend, register handles both registration and login via OTP
      // For a simple login via OTP, we might need a separate endpoint or use register with existing user
      // Since the backend AuthController only has /register and /login (pwd), 
      // I'll assume for now OTP is for registration as per the controller.
      // If the user wants OTP login, they might need to update the backend.
      // For now, I'll just show a message.
      toast.info('OTP Login is being integrated with backend.');
      setIsLoading(false);
    } catch (error) {
      toast.error('OTP verification failed.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-8 rounded-[2.5rem] relative overflow-hidden"
      >
        <AnimatePresence mode="wait">
          {authView === 'default' ? (
            <motion.div
              key="default-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10">
                <Link to="/" className="inline-flex items-center gap-2 mb-6">
                  <div className="bg-primary p-1.5 rounded-lg">
                    <span className="text-white font-black text-xl tracking-tighter">T</span>
                  </div>
                  <span className="text-xl font-black text-primary">Tomato</span>
                </Link>
                <h1 className="text-3xl font-black text-text-primary mb-2">Welcome Back!</h1>
                <p className="text-text-secondary text-sm">Please enter your details to sign in</p>
              </div>

              <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-6">
                <Input
                  label="Email Address"
                  placeholder="example@mail.com"
                  icon={Mail}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    icon={Lock}
                    error={errors.password?.message}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[38px] text-gray-400 hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex items-center justify-between px-1">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-all"
                      {...register('rememberMe')}
                    />
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">Remember me</span>
                  </label>
                  <Link to="/forgot-password" size="sm" className="text-sm font-bold text-primary hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="submit"
                    className="w-full py-3.5 text-sm rounded-[16px]"
                    loading={isLoading && authView === 'default'}
                  >
                    Sign In <LogIn size={16} className="ml-2" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleGetOTP}
                    disabled={isLoading}
                    className="w-full py-3.5 text-sm rounded-[16px] border-2 border-primary/20 text-primary hover:bg-primary/5"
                  >
                    Login to OTP <Smartphone size={16} className="ml-2" />
                  </Button>
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-100 dark:border-gray-800"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white dark:bg-[#111827] px-4 text-gray-400 font-medium">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    type="button" 
                    onClick={() => handleGoogleLogin()}
                    className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5" alt="Google" />
                    <span className="text-sm font-medium dark:text-gray-300">Google</span>
                  </button>
                  <button type="button" className="flex items-center justify-center gap-2 p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5" alt="Facebook" />
                    <span className="text-sm font-medium dark:text-gray-300">Facebook</span>
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-text-secondary">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-bold hover:underline flex items-center justify-center gap-1 mt-1">
                  Create account <ArrowRight size={14} />
                </Link>
              </p>
            </motion.div>
          ) : (
            <OtpVerification
              key="otp-view"
              email={emailValue}
              onVerify={handleVerifyOTP}
              onCancel={() => setAuthView('default')}
              resendOtp={handleGetOTP}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
