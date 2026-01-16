import { useState } from 'react';
import { motion } from 'framer-motion';
import { OptionCard } from '@/components/assessment/OptionCard';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface Option {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

interface SingleSelectStepProps {
  question: string;
  subtitle?: string;
  options: Option[];
  requiresContinue: boolean;
  onComplete: (answer: string) => void;
}

export function SingleSelectStep({ 
  question, 
  subtitle,
  options, 
  requiresContinue, 
  onComplete 
}: SingleSelectStepProps) {
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
      <div className="text-center mb-4">
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
        className="flex flex-col gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
          >
            <OptionCard
              id={option.id}
              label={option.label}
              icon={option.icon}
              description={option.description}
              selected={selected === option.id}
              onClick={() => handleSelect(option.id)}
            />
          </motion.div>
        ))}
      </motion.div>

      {requiresContinue && (
        <div className="mt-4">
          <ContinueButton
            onClick={() => selected && onComplete(selected)}
            disabled={!selected}
          />
        </div>
      )}
    </motion.div>
  );
}
