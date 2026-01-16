import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface Option {
  id: string;
  label: string;
  icon?: string;
}

interface InterestsSelectStepProps {
  question: string;
  subtitle?: string;
  options: Option[];
  onComplete: (answers: string[]) => void;
}

export function InterestsSelectStep({
  question,
  subtitle,
  options,
  onComplete,
}: InterestsSelectStepProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    );
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
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {options.map((option, index) => {
          const isSelected = selected.includes(option.id);
          return (
            <motion.button
              key={option.id}
              onClick={() => handleToggle(option.id)}
              className={`
                relative p-4 rounded-2xl border-2
                transition-all duration-300 flex flex-col items-center justify-center gap-2
                min-h-[90px]
                ${isSelected
                  ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-soft'
                  : 'border-border bg-card hover:border-primary/50 hover:shadow-soft'
                }
              `}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.03 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              {isSelected && (
                <motion.div
                  className="absolute top-2 left-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  <Check className="w-3 h-3 text-primary-foreground" />
                </motion.div>
              )}
              
              <motion.span
                className="text-3xl"
                animate={isSelected ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                {option.icon}
              </motion.span>
              
              <span className={`font-medium text-sm ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>

      <ContinueButton
        onClick={() => onComplete(selected)}
        disabled={selected.length === 0}
      />
    </motion.div>
  );
}
