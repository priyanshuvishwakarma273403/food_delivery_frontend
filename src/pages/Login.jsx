import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, Smartphone, Shield } from 'lucide-react';
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
  const [authView, setAuthView] = useState('default');
  
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
  } = useForm({ resolver: zodResolver(loginSchema) });

  const emailValue = watch('email');

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const response = await authService.googleLogin(tokenResponse.credential);
        if (response.success) {
          const { user: userData, accessToken } = response.data;
          login(userData, accessToken);
          toast.success(`Welcome back, ${userData.name}!`);
          navigate(from, { replace: true });
        } else {
          toast.error(response.message || 'Google login failed');
        }
      } catch (error) {
        toast.error('Google login failed. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => toast.error('Google login was unsuccessful.')
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
      const errorMsg = error.response?.data?.message || 'Invalid email or password. Please try again.';
      toast.error(errorMsg);
      if (error.response?.status === 404) {
        navigate('/register', { state: { email: data.email } });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGetOTP = async () => {
    const isEmailValid = await trigger('email');
    if (!isEmailValid) { toast.error('Please enter a valid email'); return; }
    setIsLoading(true);
    try {
      const response = await authService.sendOtp(emailValue);
      if (response.success) {
        setAuthView('otp');
        toast.success(`OTP sent to ${emailValue}`);
      } else {
        toast.error(response.message || 'Failed to send OTP');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to send OTP. Is your email registered?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otp) => {
    setIsLoading(true);
    try {
      toast.info('OTP Login coming soon!');
    } catch {
      toast.error('OTP verification failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FC8019]/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="bg-white w-full max-w-md rounded-3xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] overflow-hidden relative"
      >
        <AnimatePresence mode="wait">
          {authView === 'default' ? (
            <motion.div
              key="default-view"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="p-8 md:p-10"
            >
              {/* Header */}
              <div className="text-center mb-8">
                <Link to="/" className="inline-flex items-center gap-2 mb-6">
                  <div className="bg-primary w-10 h-10 rounded-xl flex items-center justify-center shadow-md shadow-primary/30">
                    <span className="text-white font-black text-xl tracking-tighter">T</span>
                  </div>
                  <span className="text-2xl font-black text-primary">Tomato</span>
                </Link>
                <h1 className="text-2xl md:text-3xl font-black text-[#1C1C1C] mb-2">Welcome back!</h1>
                <p className="text-[#686B78] text-sm">Sign in to continue your delicious journey</p>
              </div>

              <form onSubmit={handleSubmit(onSubmitPassword)} className="space-y-5">
                <Input
                  label="Email Address"
                  placeholder="your@email.com"
                  icon={Mail}
                  error={errors.email?.message}
                  {...register('email')}
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    icon={Lock}
                    error={errors.password?.message}
                    {...register('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-[38px] text-[#9093A4] hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary/20 transition-all accent-primary"
                      {...register('rememberMe')}
                    />
                    <span className="text-sm text-[#686B78] group-hover:text-[#1C1C1C] transition-colors">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm font-bold text-primary hover:text-primary-dark transition-colors">
                    Forgot Password?
                  </Link>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white font-black rounded-xl transition-colors text-sm shadow-sm shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isLoading ? (
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <><LogIn size={16} /> Sign In</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleGetOTP}
                    disabled={isLoading}
                    className="w-full py-3.5 border-2 border-primary/20 hover:border-primary text-primary font-black rounded-xl transition-all text-sm flex items-center justify-center gap-2 hover:bg-primary/5 disabled:opacity-70"
                  >
                    <Smartphone size={16} /> OTP Login
                  </button>
                </div>

                {/* Divider */}
                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#F0F0F0]" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-4 text-[#9093A4] font-semibold">Or continue with</span>
                  </div>
                </div>

                {/* Social Login */}
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    type="button" 
                    onClick={() => handleGoogleLogin()}
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E8E8E8] hover:border-gray-300 hover:bg-gray-50 transition-all text-sm font-semibold text-[#1C1C1C]"
                  >
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="h-5" alt="Google" />
                    Google
                  </button>
                  <button 
                    type="button" 
                    className="flex items-center justify-center gap-2 py-3 rounded-xl border border-[#E8E8E8] hover:border-gray-300 hover:bg-gray-50 transition-all text-sm font-semibold text-[#1C1C1C]"
                  >
                    <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="h-5" alt="Facebook" />
                    Facebook
                  </button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-[#686B78]">
                Don't have an account?{' '}
                <Link to="/register" className="text-primary font-black hover:underline inline-flex items-center gap-1">
                  Create account <ArrowRight size={14} />
                </Link>
              </p>

              {/* Trust badges */}
              <div className="mt-6 flex items-center justify-center gap-2 text-[#686B78]">
                <Shield size={14} />
                <span className="text-[11px] font-medium">Secured with 256-bit SSL encryption</span>
              </div>
            </motion.div>
          ) : (
            <div className="p-8 md:p-10">
              <OtpVerification
                key="otp-view"
                email={emailValue}
                onVerify={handleVerifyOTP}
                onCancel={() => setAuthView('default')}
                resendOtp={handleGetOTP}
              />
            </div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;
