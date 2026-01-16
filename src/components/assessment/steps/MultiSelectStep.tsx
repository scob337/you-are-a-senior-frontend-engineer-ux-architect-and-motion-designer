import { useState } from 'react';
import { motion } from 'framer-motion';
import { OptionCard } from '@/components/assessment/OptionCard';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface Option {
  id: string;
  label: string;
  icon?: string;
}

interface MultiSelectStepProps {
  question: string;
  subtitle?: string;
  options: Option[];
  onComplete: (answers: string[]) => void;
}

export function MultiSelectStep({ 
  question, 
  subtitle,
  options, 
  onComplete 
}: MultiSelectStepProps) {
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
        className="grid grid-cols-2 gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.03 }}
          >
            <OptionCard
              id={option.id}
              label={option.label}
              icon={option.icon}
              selected={selected.includes(option.id)}
              onClick={() => handleToggle(option.id)}
              variant="compact"
            />
          </motion.div>
        ))}
      </motion.div>

      <ContinueButton
        onClick={() => onComplete(selected)}
        disabled={selected.length === 0}
      />
    </motion.div>
  );
}
