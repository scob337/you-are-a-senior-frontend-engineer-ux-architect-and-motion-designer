import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface ContinueButtonProps {
  onClick: () => void;
  disabled?: boolean;
  label?: string;
}

export function ContinueButton({ onClick, disabled = false, label = 'متابعة' }: ContinueButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full py-4 px-6 rounded-2xl font-semibold text-lg
        flex items-center justify-center gap-3
        transition-all duration-300 btn-bounce
        ${disabled 
          ? 'bg-muted text-muted-foreground cursor-not-allowed' 
          : 'gradient-primary text-primary-foreground shadow-soft hover:shadow-elevated'
        }
      `}
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <span>{label}</span>
      <ArrowLeft className="w-5 h-5" />
    </motion.button>
  );
}
