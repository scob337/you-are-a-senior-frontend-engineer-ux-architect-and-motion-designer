import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
  showLabel?: boolean;
}

export function ProgressBar({ progress, showLabel = false }: ProgressBarProps) {
  return (
    <div className="w-full px-4 py-3">
      <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 right-0 bg-primary rounded-full progress-shimmer"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      {showLabel && (
        <motion.p
          className="text-center text-sm text-muted-foreground mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {progress}% مكتمل
        </motion.p>
      )}
    </div>
  );
}
