import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface BackButtonProps {
  onClick: () => void;
}

export function BackButton({ onClick }: BackButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <ArrowRight className="w-5 h-5" />
    </motion.button>
  );
}
