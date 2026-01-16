import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

interface WordChipProps {
  word: string;
  selected: boolean;
  onClick: () => void;
}

export function WordChip({ word, selected, onClick }: WordChipProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative py-2 px-4 rounded-full border-2 font-medium
        transition-all duration-200
        ${selected 
          ? 'border-primary bg-primary text-primary-foreground' 
          : 'border-border bg-card text-foreground hover:border-primary/50'
        }
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      layout
    >
      <span className="flex items-center gap-2">
        {word}
        {selected && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          >
            <Check className="w-4 h-4" />
          </motion.span>
        )}
      </span>
    </motion.button>
  );
}
