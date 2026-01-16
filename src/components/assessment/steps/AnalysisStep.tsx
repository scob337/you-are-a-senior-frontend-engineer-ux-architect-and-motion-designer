import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Quote } from 'lucide-react';

interface Phase {
  progress: number;
  text: string;
}

interface PopupOption {
  id: string;
  label: string;
}

interface Popup {
  triggerProgress: number;
  question: string;
  options?: PopupOption[];
  type?: string;
  progressJump: number;
}

interface Testimonial {
  text: string;
  author: string;
}

interface AnalysisStepProps {
  phases: Phase[];
  popups: Popup[];
  testimonial: Testimonial;
  onComplete: () => void;
}

export function AnalysisStep({ phases, popups, testimonial, onComplete }: AnalysisStepProps) {
  const [progress, setProgress] = useState(0);
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [activePopup, setActivePopup] = useState<Popup | null>(null);
  const [completedPhases, setCompletedPhases] = useState<number[]>([]);
  const [timeValue, setTimeValue] = useState('09:00');

  useEffect(() => {
    if (activePopup) return;
    
    const timer = setInterval(() => {
      setProgress(prev => {
        const nextPhase = phases[currentPhaseIndex + 1];
        const popup = popups.find(p => p.triggerProgress === prev + 1);
        
        if (popup) {
          setActivePopup(popup);
          clearInterval(timer);
          return prev;
        }

        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }

        if (nextPhase && prev >= nextPhase.progress) {
          setCompletedPhases(curr => [...curr, currentPhaseIndex]);
          setCurrentPhaseIndex(i => i + 1);
        }

        return prev + 1;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [phases, popups, currentPhaseIndex, activePopup, onComplete]);

  const handlePopupSelect = (popup: Popup) => {
    setActivePopup(null);
    setProgress(popup.progressJump);
    const nextPhaseIndex = phases.findIndex(p => p.progress >= popup.progressJump);
    if (nextPhaseIndex !== -1) {
      setCurrentPhaseIndex(nextPhaseIndex);
      setCompletedPhases(phases.slice(0, nextPhaseIndex).map((_, i) => i));
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center gap-6 py-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Robot Animation */}
      <motion.div
        className="relative w-32 h-32"
        animate={{ 
          y: [0, -10, 0],
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      >
        <div className="w-full h-full rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
          <span className="text-7xl">🤖</span>
        </div>
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 bg-foreground/10 rounded-full blur-sm"
          animate={{ scaleX: [1, 0.8, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full">
        <div className="relative h-3 bg-secondary rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 right-0 gradient-primary rounded-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <p className="text-center text-sm text-muted-foreground mt-2">{progress}%</p>
      </div>

      {/* Phases */}
      <div className="w-full space-y-3">
        {phases.map((phase, index) => (
          <motion.div
            key={index}
            className={`flex items-center gap-3 p-3 rounded-xl transition-all
              ${completedPhases.includes(index) 
                ? 'bg-primary/10' 
                : index === currentPhaseIndex 
                  ? 'bg-card border border-border' 
                  : 'opacity-50'
              }`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {completedPhases.includes(index) ? (
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            ) : index === currentPhaseIndex ? (
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-muted" />
            )}
            <span className={`text-sm ${completedPhases.includes(index) ? 'text-primary font-medium' : 'text-foreground'}`}>
              {phase.text}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Testimonial */}
      <motion.div
        className="w-full p-4 rounded-2xl bg-card border border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Quote className="w-6 h-6 text-accent mb-2" />
        <p className="text-foreground text-sm leading-relaxed mb-2">"{testimonial.text}"</p>
        <p className="text-muted-foreground text-xs">{testimonial.author}</p>
      </motion.div>

      {/* Popup Modal */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-sm bg-background rounded-3xl p-6 shadow-elevated"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <h3 className="text-xl font-bold text-foreground text-center mb-6">
                {activePopup.question}
              </h3>
              
              {activePopup.type === 'time' ? (
                <div className="space-y-4">
                  <input
                    type="time"
                    value={timeValue}
                    onChange={(e) => setTimeValue(e.target.value)}
                    className="w-full p-4 text-center text-2xl border-2 border-border rounded-xl bg-card text-foreground focus:border-primary focus:outline-none"
                  />
                  <button
                    onClick={() => handlePopupSelect(activePopup)}
                    className="w-full py-4 gradient-primary text-primary-foreground rounded-xl font-semibold"
                  >
                    تأكيد
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {activePopup.options?.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handlePopupSelect(activePopup)}
                      className="w-full py-4 px-6 rounded-xl border-2 border-border bg-card text-foreground font-medium hover:border-primary transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
