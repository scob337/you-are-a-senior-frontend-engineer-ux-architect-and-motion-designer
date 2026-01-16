import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface OptionCardProps {
  id: string;
  label: string;
  icon?: string;
  description?: string;
  selected: boolean;
  onClick: () => void;
  variant?: 'default' | 'card' | 'compact';
}

export function OptionCard({ 
  label, 
  icon, 
  description, 
  selected, 
  onClick,
  variant = 'default'
}: OptionCardProps) {
  if (variant === 'card') {
    return (
      <motion.button
        onClick={onClick}
        className={`
          relative p-6 rounded-2xl border-2 text-right w-full
          transition-all duration-300 card-hover
          ${selected 
            ? 'border-primary bg-primary/5 shadow-soft' 
            : 'border-border bg-card hover:border-primary/50'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        {selected && (
          <motion.div
            className="absolute top-3 left-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <Check className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        )}
        <div className="flex flex-col items-center gap-3">
          {icon && <span className="text-4xl">{icon}</span>}
          <span className="text-lg font-semibold text-foreground">{label}</span>
          {description && (
            <span className="text-sm text-muted-foreground">{description}</span>
          )}
        </div>
      </motion.button>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.button
        onClick={onClick}
        className={`
          relative py-3 px-4 rounded-xl border-2 text-right
          transition-all duration-300
          ${selected 
            ? 'border-primary bg-primary/5' 
            : 'border-border bg-card hover:border-primary/50'
          }
        `}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-xl">{icon}</span>}
          <span className="font-medium text-foreground">{label}</span>
          {selected && (
            <motion.div
              className="mr-auto w-5 h-5 bg-primary rounded-full flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <Check className="w-3 h-3 text-primary-foreground" />
            </motion.div>
          )}
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative p-4 rounded-xl border-2 text-right w-full
        transition-all duration-300
        ${selected 
          ? 'border-primary bg-primary/5 shadow-soft' 
          : 'border-border bg-card hover:border-primary/50'
        }
      `}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      layout
    >
      <div className="flex items-center gap-4">
        {icon && <span className="text-2xl">{icon}</span>}
        <div className="flex-1">
          <span className="text-lg font-medium text-foreground">{label}</span>
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        {selected && (
          <motion.div
            className="w-6 h-6 bg-primary rounded-full flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <Check className="w-4 h-4 text-primary-foreground" />
          </motion.div>
        )}
      </div>
    </motion.button>
  );
}
