import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface Option {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

interface CardGridSelectStepProps {
  question: string;
  subtitle?: string;
  options: Option[];
  columns?: 2 | 3;
  requiresContinue: boolean;
  onComplete: (answer: string) => void;
}

export function CardGridSelectStep({
  question,
  subtitle,
  options,
  columns = 2,
  requiresContinue,
  onComplete,
}: CardGridSelectStepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    if (!requiresContinue) {
      setTimeout(() => onComplete(id), 300);
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-2">
        <motion.h2
          className="text-2xl font-bold text-foreground mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {question}
        </motion.h2>
        {subtitle && (
          <motion.p
            className="text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        className={`grid gap-3 ${columns === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            className={`
              relative p-4 rounded-2xl border-2 text-center
              transition-all duration-300 flex flex-col items-center justify-center gap-2
              min-h-[100px]
              ${selected === option.id
                ? 'border-primary bg-primary/5 shadow-soft'
                : 'border-border bg-card hover:border-primary/50 hover:shadow-soft'
              }
            `}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {selected === option.id && (
              <motion.div
                className="absolute top-2 left-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                <Check className="w-3 h-3 text-primary-foreground" />
              </motion.div>
            )}
            {option.icon && (
              <span className="text-3xl mb-1">{option.icon}</span>
            )}
            <span className="font-semibold text-foreground text-sm leading-tight">
              {option.label}
            </span>
            {option.description && (
              <span className="text-xs text-muted-foreground">
                {option.description}
              </span>
            )}
          </motion.button>
        ))}
      </motion.div>

      {requiresContinue && (
        <ContinueButton
          onClick={() => selected && onComplete(selected)}
          disabled={!selected}
        />
      )}
    </motion.div>
  );
}
