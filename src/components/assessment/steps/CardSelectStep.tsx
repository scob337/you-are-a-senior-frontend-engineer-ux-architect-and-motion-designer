import { useState } from 'react';
import { motion } from 'framer-motion';
import { OptionCard } from '@/components/assessment/OptionCard';

interface Option {
  id: string;
  label: string;
  description?: string;
  image?: string;
}

interface CardSelectStepProps {
  question: string;
  options: Option[];
  onComplete: (answer: string) => void;
}

export function CardSelectStep({ question, options, onComplete }: CardSelectStepProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelected(id);
    setTimeout(() => onComplete(id), 400);
  };

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2 
        className="text-2xl font-bold text-foreground text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {question}
      </motion.h2>

      <div className="grid grid-cols-2 gap-4">
        {options.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <OptionCard
              id={option.id}
              label={option.label}
              description={option.description}
              icon={getLevelEmoji(option.id)}
              selected={selected === option.id}
              onClick={() => handleSelect(option.id)}
              variant="card"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function getLevelEmoji(level: string): string {
  const emojis: Record<string, string> = {
    beginner: '🌱',
    elementary: '🌿',
    intermediate: '🌳',
    advanced: '🏆',
  };
  return emojis[level] || '📚';
}
