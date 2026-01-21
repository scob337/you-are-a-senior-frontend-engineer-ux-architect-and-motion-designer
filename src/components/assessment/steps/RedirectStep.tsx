import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Rocket } from 'lucide-react';

interface RedirectStepProps {
  redirectUrl: string;
}

export function RedirectStep({ redirectUrl }: RedirectStepProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.clear()
      window.location.href = redirectUrl;
    }, 2000);

    return () => clearTimeout(timer);
  }, [redirectUrl]);

  return (
    <motion.div
      className="flex flex-col items-center justify-center gap-6 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center">
          <Rocket className="w-12 h-12 text-primary-foreground" />
        </div>
      </motion.div>

      <motion.h2
        className="text-2xl font-bold text-foreground text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
خطوة واحدة وتتكلم إنجليزي بثقة 🔥
      </motion.h2>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </motion.div>
    </motion.div>
  );
}
