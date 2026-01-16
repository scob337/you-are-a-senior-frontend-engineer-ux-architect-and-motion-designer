import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface Option {
  id: string;
  label: string;
  value?: number;
}

interface DifficultyCheckStepProps {
  statement: string;
  question: string;
  options: Option[];
  onComplete: (value: number) => void;
}

export function DifficultyCheckStep({ 
  statement, 
  question, 
  options, 
  onComplete 
}: DifficultyCheckStepProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<number>(0);

  const handleSelect = (id: string, value: number | undefined) => {
    setSelected(id);
    setSelectedValue(value || 0);
  };

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="bg-card border border-border rounded-2xl p-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="text-lg text-foreground font-medium leading-relaxed">
          "{statement}"
        </p>
      </motion.div>

      <motion.h3 
        className="text-xl font-bold text-foreground text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {question}
      </motion.h3>

      <div className="flex flex-col gap-3">
        {options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => handleSelect(option.id, option.value)}
            className={`
              w-full py-4 px-6 rounded-xl border-2 font-medium text-lg
              transition-all duration-300
              ${selected === option.id 
                ? 'border-primary bg-primary/5 text-primary' 
                : 'border-border bg-card text-foreground hover:border-primary/50'
              }
            `}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {option.label}
          </motion.button>
        ))}
      </div>

      <ContinueButton
        onClick={() => onComplete(selectedValue)}
        disabled={!selected}
      />
    </motion.div>
  );
}
