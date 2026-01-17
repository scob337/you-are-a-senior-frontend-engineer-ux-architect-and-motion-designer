import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

export function MicAnimation() {
  return (
    <div className="relative flex items-center justify-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute w-32 h-32 rounded-full border-2 border-primary/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.5],
            opacity: [0.5, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: 'easeOut'
          }}
        />
      ))}
      
      {/* Main mic container */}
      <motion.div
        className="relative w-24 h-24 rounded-full gradient-primary flex items-center justify-center shadow-soft"
        animate={{ 
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <Mic className="w-10 h-10 text-primary-foreground" />
      </motion.div>
    </div>
  );
}
