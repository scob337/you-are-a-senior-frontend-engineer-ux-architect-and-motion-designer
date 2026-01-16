import { motion } from 'framer-motion';
import { MicAnimation } from '@/components/assessment/MicAnimation';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface SpeakingIntroStepProps {
  title: string;
  subtitle: string;
  onComplete: () => void;
}

export function SpeakingIntroStep({ title, subtitle, onComplete }: SpeakingIntroStepProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-40 h-40 rounded-3xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
      >
        <span className="text-7xl">🤖</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-lg text-primary font-medium">{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5 }}
      >
        <MicAnimation />
      </motion.div>

      <ContinueButton onClick={onComplete} />
    </motion.div>
  );
}
