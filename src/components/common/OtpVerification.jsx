import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ArrowRight, RefreshCw, ArrowLeft } from 'lucide-react';
import Button from './Button';

const OtpVerification = ({ email, onVerify, onCancel, resendOtp }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [activeOTPIndex, setActiveOTPIndex] = useState(0);
  const [timer, setTimer] = useState(30);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOTPIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOnChange = (e, index) => {
    const { value } = e.target;
    const newOTP = [...otp];
    newOTP[index] = value.substring(value.length - 1);
    setOtp(newOTP);

    if (!value) setActiveOTPIndex(index - 1);
    else setActiveOTPIndex(index + 1);
  };

  const handleOnKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index]) {
      setActiveOTPIndex(index - 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
        if (/^\d$/.test(pastedData[i])) {
            newOtp[i] = pastedData[i];
        }
    }
    setOtp(newOtp);
    setActiveOTPIndex(Math.min(pastedData.length, 5));
  };

  const handleVerify = async () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setIsVerifying(true);
      try {
        await onVerify(otpValue);
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      resendOtp();
      setTimer(30);
      setOtp(['', '', '', '', '', '']);
      setActiveOTPIndex(0);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="w-full"
    >
      <div className="text-center mb-8 relative">
        <button 
          onClick={onCancel}
          className="absolute left-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-colors group"
        >
          <ArrowLeft size={20} className="text-text-secondary group-hover:text-primary transition-colors" />
        </button>
        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl font-black text-text-primary mb-2">Verify Your Account</h2>
        <p className="text-text-secondary text-sm px-4">
          We've sent a 6-digit verification code to <span className="font-semibold text-text-primary">{email}</span>
        </p>
      </div>

      <div className="flex justify-center gap-2 sm:gap-3 mb-8" onPaste={handlePaste}>
        {otp.map((_, index) => (
          <React.Fragment key={index}>
            <input
              ref={index === activeOTPIndex ? inputRef : null}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-bold bg-white border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-4 focus:ring-primary/20 outline-none transition-all"
              onChange={(e) => handleOnChange(e, index)}
              onKeyDown={(e) => handleOnKeyDown(e, index)}
              value={otp[index]}
              maxLength={1}
            />
            {index === 2 && <div className="w-2 sm:w-4 flex items-center justify-center text-gray-300">-</div>}
          </React.Fragment>
        ))}
      </div>

      <Button
        onClick={handleVerify}
        disabled={otp.join('').length !== 6 || isVerifying}
        loading={isVerifying}
        className="w-full py-4 text-base rounded-[20px] mb-6 shadow-xl shadow-primary/20"
      >
        Verify Code <ArrowRight size={18} className="ml-2" />
      </Button>

      <div className="text-center">
        <p className="text-sm border-t border-gray-100 pt-6">
          Didn't receive the code?{' '}
          <AnimatePresence mode="wait">
            {timer > 0 ? (
              <motion.span
                key="timer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-text-secondary font-medium"
              >
                Resend in <span className="text-primary font-bold">{timer}s</span>
              </motion.span>
            ) : (
              <motion.button
                key="resend"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleResend}
                className="text-primary font-bold hover:underline flex items-center justify-center gap-1 mx-auto mt-2 bg-primary/5 px-4 py-2 rounded-full transition-colors hover:bg-primary/10"
              >
                <RefreshCw size={14} /> Resend OTP
              </motion.button>
            )}
          </AnimatePresence>
        </p>
      </div>
    </motion.div>
  );
};

export default OtpVerification;
