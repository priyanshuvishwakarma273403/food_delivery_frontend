import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const Input = forwardRef(({
  label,
  error,
  type = 'text',
  className,
  icon: Icon,
  ...props
}, ref) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label className="text-xs font-bold text-[#686B78] pl-1 uppercase tracking-wide">
          {label}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9093A4] group-focus-within:text-primary transition-colors">
            <Icon size={18} />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full rounded-xl border border-[#E8E8E8] bg-[#F5F5F6] focus:bg-white py-3 text-sm outline-none transition-all duration-200 placeholder:text-[#9093A4] text-[#1C1C1C] font-medium',
            'focus:border-primary/40 focus:ring-4 focus:ring-primary/5',
            Icon ? 'pl-11 pr-4' : 'px-4',
            error ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-red-400/10' : '',
            className
          )}
          {...props}
        />
      </div>
      {error && (
        <p className="text-xs font-semibold text-red-500 pl-1 flex items-center gap-1">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
