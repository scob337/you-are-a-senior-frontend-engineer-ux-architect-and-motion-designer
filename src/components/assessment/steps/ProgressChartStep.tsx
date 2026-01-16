import { motion } from 'framer-motion';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface ChartData {
  current: string;
  after4weeks: string;
  otherApps: string;
}

interface ProgressChartStepProps {
  title: string;
  chartData: ChartData;
  userName: string;
  estimatedLevel?: string;
  onComplete: () => void;
}

export function ProgressChartStep({ title, chartData, userName, estimatedLevel = 'A2', onComplete }: ProgressChartStepProps) {
  const displayTitle = title.replace('{name}', userName || 'صديقنا');

  const weeklyGoals = [
    { week: 'الأسبوع 1', goal: 'بناء الأساسيات', icon: '📚' },
    { week: 'الأسبوع 2', goal: 'تطوير المفردات', icon: '📝' },
    { week: 'الأسبوع 3', goal: 'تحسين الاستماع', icon: '🎧' },
    { week: 'الأسبوع 4', goal: 'التحدث بطلاقة', icon: '🗣️' },
  ];

  return (
    <motion.div
      className="flex flex-col gap-5"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {/* Header with user name */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-3"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">خطتك جاهزة!</span>
        </motion.div>
        <h2 className="text-xl font-bold text-foreground leading-relaxed">
          {displayTitle}
        </h2>
      </motion.div>

      {/* Current Level Badge */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-lg font-bold text-primary-foreground">{estimatedLevel}</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">مستواك الحالي</p>
              <p className="font-semibold text-foreground">المستوى {estimatedLevel}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Chart - Simplified Visual */}
      <motion.div
        className="relative p-4 rounded-2xl bg-card border border-border overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-medium text-foreground">رحلة التعلم</span>
          <span className="text-xs text-muted-foreground">4 أسابيع</span>
        </div>

        {/* Progress Bar Visual */}
        <div className="relative h-3 bg-secondary rounded-full mb-4 overflow-hidden">
          <motion.div
            className="absolute inset-y-0 right-0 gradient-primary rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2, delay: 0.6, ease: 'easeOut' }}
          />
          {/* Week markers */}
          {[25, 50, 75].map((pos, i) => (
            <div
              key={i}
              className="absolute top-0 bottom-0 w-0.5 bg-background/50"
              style={{ left: `${pos}%` }}
            />
          ))}
        </div>

        {/* Level progression */}
        <div className="flex justify-between text-xs text-muted-foreground px-1">
          <span className="font-medium text-primary">{estimatedLevel}</span>
          <span>→</span>
          <span className="font-medium text-accent">B2+</span>
        </div>
      </motion.div>

      {/* Weekly Goals */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="text-sm font-medium text-muted-foreground mb-3">خطتك الأسبوعية:</h3>
        {weeklyGoals.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">{item.week}</p>
              <p className="text-sm font-medium text-foreground">{item.goal}</p>
            </div>
            <CheckCircle2 className="w-5 h-5 text-primary/30" />
          </motion.div>
        ))}
      </motion.div>

      {/* Comparison Note */}
      <motion.div
        className="flex items-center justify-center gap-4 text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-1">
          <div className="w-3 h-1 rounded-full gradient-primary" />
          <span>BeFluent: تقدم سريع</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-1 rounded-full bg-muted-foreground/30" />
          <span>تطبيقات أخرى</span>
        </div>
      </motion.div>

      <ContinueButton onClick={onComplete} label="ابدأ رحلتك" />
    </motion.div>
  );
}
