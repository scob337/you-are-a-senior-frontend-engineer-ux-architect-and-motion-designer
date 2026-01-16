import { motion } from 'framer-motion';
import { Target } from 'lucide-react';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface InfoProgramStepProps {
  title: string;
  subtitle: string;
  onComplete: () => void;
}

export function InfoProgramStep({ title, subtitle, onComplete }: InfoProgramStepProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center py-8"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
      >
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <motion.span 
            className="text-6xl"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            🎯
          </motion.span>
        </div>
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-accent flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Target className="w-4 h-4 text-accent-foreground" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-foreground mb-3">{title}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
      </motion.div>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {['📚', '🎧', '🗣️', '✍️'].map((emoji, i) => (
          <motion.span
            key={i}
            className="text-3xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.1 }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      <ContinueButton onClick={onComplete} />
    </motion.div>
  );
}
