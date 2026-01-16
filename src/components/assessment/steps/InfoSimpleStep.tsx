import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface InfoSimpleStepProps {
  title: string;
  subtitle: string;
  onComplete: () => void;
}

export function InfoSimpleStep({ title, subtitle, onComplete }: InfoSimpleStepProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center py-8"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
      >
        <Sparkles className="w-10 h-10 text-primary-foreground" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
        <p className="text-lg text-muted-foreground">{subtitle}</p>
      </motion.div>

      <ContinueButton onClick={onComplete} />
    </motion.div>
  );
}
