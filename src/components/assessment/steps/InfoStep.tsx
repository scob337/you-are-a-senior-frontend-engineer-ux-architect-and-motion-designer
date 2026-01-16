import { motion } from 'framer-motion';
import { Star, Users, Award } from 'lucide-react';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface Stat {
  value: string;
  label: string;
  icon?: string;
}

interface InfoStepProps {
  title: string;
  stats?: Stat[];
  onComplete: () => void;
}

export function InfoStep({ title, stats, onComplete }: InfoStepProps) {
  return (
    <motion.div
      className="flex flex-col items-center gap-8 text-center"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="w-24 h-24 rounded-full gradient-accent flex items-center justify-center float-animation"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
      >
        <Award className="w-12 h-12 text-accent-foreground" />
      </motion.div>

      <motion.h2 
        className="text-2xl font-bold text-foreground"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {title}
      </motion.h2>

      {stats && (
        <motion.div 
          className="grid grid-cols-3 gap-4 w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              {stat.icon === 'star' ? (
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  <Star className="w-5 h-5 text-accent fill-accent" />
                </div>
              ) : stat.icon === 'users' ? (
                <Users className="w-6 h-6 text-primary" />
              ) : (
                <span className="text-2xl font-bold text-primary">{stat.value}</span>
              )}
              <span className="text-sm text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      <ContinueButton onClick={onComplete} />
    </motion.div>
  );
}
