import { motion } from 'framer-motion';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface ResultStepProps {
  title: string;
  levels: string[];
  motivationalText: string;
  estimatedLevel: string;
  estimatedVocabulary: number;
  onComplete: () => void;
}

export function ResultStep({ 
  title, 
  levels, 
  motivationalText,
  estimatedLevel,
  estimatedVocabulary,
  onComplete 
}: ResultStepProps) {
  const levelIndex = levels.indexOf(estimatedLevel);
  const progressPercent = ((levelIndex + 1) / levels.length) * 100;

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <motion.h2 
        className="text-2xl font-bold text-foreground text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {title}
      </motion.h2>

      {/* Vocabulary Estimate */}
      <motion.div
        className="text-center p-6 rounded-2xl bg-card border border-border"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <p className="text-muted-foreground mb-2">عدد الكلمات المقدرة</p>
        <motion.p
          className="text-5xl font-bold text-primary"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.4 }}
        >
          {estimatedVocabulary.toLocaleString('ar-EG')}
        </motion.p>
        <p className="text-muted-foreground mt-1">كلمة</p>
      </motion.div>

      {/* Level Scale */}
      <motion.div
        className="p-6 rounded-2xl bg-card border border-border"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-center text-muted-foreground mb-4">مستواك الحالي</p>
        
        {/* Progress Bar */}
        <div className="relative mb-4">
          <div className="h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div
              className="h-full gradient-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          
          {/* Current Level Marker */}
          <motion.div
            className="absolute top-full mt-2"
            style={{ right: `${progressPercent}%`, transform: 'translateX(50%)' }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-primary mx-auto" />
          </motion.div>
        </div>

        {/* Level Labels */}
        <div className="flex justify-between mt-8">
          {levels.map((level, index) => (
            <motion.span
              key={level}
              className={`text-sm font-medium ${
                level === estimatedLevel 
                  ? 'text-primary' 
                  : 'text-muted-foreground'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              {level}
            </motion.span>
          ))}
        </div>

        {/* Current Level Badge */}
        <motion.div
          className="flex justify-center mt-6"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.8 }}
        >
          <span className="px-6 py-2 rounded-full gradient-primary text-primary-foreground font-bold text-lg">
            {estimatedLevel}
          </span>
        </motion.div>
      </motion.div>

      {/* Motivational Text */}
      <motion.p
        className="text-center text-muted-foreground leading-relaxed"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {motivationalText}
      </motion.p>

      <ContinueButton onClick={onComplete} />
    </motion.div>
  );
}
