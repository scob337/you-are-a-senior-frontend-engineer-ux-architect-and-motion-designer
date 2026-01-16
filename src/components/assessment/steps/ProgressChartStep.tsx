import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';
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
  onComplete: () => void;
}

export function ProgressChartStep({ title, chartData, userName, onComplete }: ProgressChartStepProps) {
  const displayTitle = title.replace('{name}', userName || 'صديقنا');

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      <motion.h2 
        className="text-2xl font-bold text-foreground text-center leading-relaxed"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {displayTitle}
      </motion.h2>

      {/* Chart Container */}
      <motion.div
        className="relative h-64 p-4 rounded-2xl bg-card border border-border overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Y-Axis Labels */}
        <div className="absolute right-4 top-4 bottom-12 flex flex-col justify-between text-xs text-muted-foreground">
          <span>C1</span>
          <span>B2</span>
          <span>B1</span>
          <span>A2</span>
          <span>A1</span>
        </div>

        {/* Chart Area */}
        <div className="absolute left-8 right-12 top-4 bottom-12">
          {/* Grid Lines */}
          {[0, 1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="absolute w-full h-px bg-border"
              style={{ top: `${i * 25}%` }}
            />
          ))}

          {/* Learna Line (Going Up) */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 0 80 Q 30 60, 50 40 T 100 10"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
            />
          </motion.svg>

          {/* Other Apps Line (Going Down) */}
          <motion.svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 0 80 Q 30 75, 50 85 T 100 90"
              fill="none"
              stroke="hsl(var(--muted-foreground))"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </motion.svg>

          {/* Start Point */}
          <motion.div
            className="absolute right-0 bottom-[20%] w-3 h-3 rounded-full bg-primary"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
          />

          {/* Learna End Point */}
          <motion.div
            className="absolute left-0 top-[10%] w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2 }}
          />
        </div>

        {/* X-Axis Labels */}
        <div className="absolute left-8 right-12 bottom-2 flex justify-between text-xs text-muted-foreground">
          <span>الآن</span>
          <span>أسبوعين</span>
          <span>4 أسابيع</span>
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="flex justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <span className="text-sm text-foreground">{chartData.after4weeks}</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">{chartData.otherApps}</span>
        </div>
      </motion.div>

      <ContinueButton onClick={onComplete} label="ابدأ رحلتك" />
    </motion.div>
  );
}
