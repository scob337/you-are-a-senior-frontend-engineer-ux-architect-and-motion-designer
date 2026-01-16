import { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface NameInputStepProps {
  title: string;
  placeholder: string;
  onComplete: (name: string) => void;
}

export function NameInputStep({ title, placeholder, onComplete }: NameInputStepProps) {
  const [name, setName] = useState('');

  return (
    <motion.div
      className="flex flex-col gap-8 py-8"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <motion.div
        className="w-20 h-20 mx-auto rounded-full gradient-primary flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
      >
        <User className="w-10 h-10 text-primary-foreground" />
      </motion.div>

      <motion.h2 
        className="text-2xl font-bold text-foreground text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {title}
      </motion.h2>

      <motion.input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={placeholder}
        className="w-full py-4 px-6 rounded-xl border-2 border-border bg-card text-foreground text-center text-xl placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      />

      <ContinueButton
        onClick={() => onComplete(name)}
        disabled={name.trim().length === 0}
      />
    </motion.div>
  );
}
