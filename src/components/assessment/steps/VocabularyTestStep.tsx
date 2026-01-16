import { useState } from 'react';
import { motion } from 'framer-motion';
import { WordChip } from '@/components/assessment/WordChip';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface VocabularyTestStepProps {
  title: string;
  subtitle: string;
  words: string[];
  onComplete: (count: number) => void;
}

export function VocabularyTestStep({ 
  title, 
  subtitle,
  words, 
  onComplete 
}: VocabularyTestStepProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const handleToggle = (word: string) => {
    setSelected(prev => 
      prev.includes(word) 
        ? prev.filter(w => w !== word)
        : [...prev, word]
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
          {title}
        </motion.h2>
        <motion.p 
          className="text-primary font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.div 
        className="flex flex-wrap justify-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {words.map((word, index) => (
          <motion.div
            key={word}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.02 }}
          >
            <WordChip
              word={word}
              selected={selected.includes(word)}
              onClick={() => handleToggle(word)}
            />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-4">
        <p className="text-center text-muted-foreground mb-4">
          تم اختيار {selected.length} كلمة
        </p>
        <ContinueButton
          onClick={() => onComplete(selected.length)}
        />
      </div>
    </motion.div>
  );
}
