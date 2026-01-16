import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Award, Crown, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import config from '@/data/config.json';

interface Badge {
  icon: string;
  text: string;
}

interface CheckboxItem {
  id: string;
  label: string;
  required?: boolean;
}

interface EmailCaptureStepProps {
  title: string;
  badges: Badge[];
  checkboxes: CheckboxItem[];
  onComplete: (email: string) => void;
}

export function EmailCaptureStep({ title, badges, checkboxes, onComplete }: EmailCaptureStepProps) {
  const [email, setEmail] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const requiredChecked = checkboxes
    .filter(c => c.required)
    .every(c => checked[c.id]);
  
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canSubmit = isValidEmail && requiredChecked && !isLoading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const userName = localStorage.getItem('clientName') || '';
      
      // Only send if EmailJS is configured
      if (config.emailjs.serviceId !== 'YOUR_SERVICE_ID') {
        await emailjs.send(
          config.emailjs.serviceId,
          config.emailjs.templateId,
          {
            user_email: email,
            user_name: userName,
          },
          config.emailjs.publicKey
        );
      }
      
      onComplete(email);
    } catch (err) {
      console.error('Email send failed:', err);
      // Continue anyway - don't block user flow
      onComplete(email);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCheckbox = (id: string) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
    >
      {/* Header with decorations */}
      <div className="relative text-center py-4">
        <motion.div
          className="absolute top-0 right-4"
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Crown className="w-8 h-8 text-accent" />
        </motion.div>
        <motion.div
          className="absolute top-2 left-4"
          initial={{ scale: 0, rotate: 20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4 }}
        >
          <span className="text-2xl">🌟</span>
        </motion.div>
        
        <motion.h2 
          className="text-2xl font-bold text-foreground"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {title}
        </motion.h2>
      </div>

      {/* Trust Badges */}
      <motion.div 
        className="flex justify-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {badges.map((badge, index) => (
          <motion.div
            key={index}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {badge.icon === 'users' && <Users className="w-4 h-4 text-primary" />}
            {badge.icon === 'award' && <Award className="w-4 h-4 text-accent" />}
            <span className="text-sm font-medium text-foreground">{badge.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Email Input */}
      <motion.div
        className="relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="أدخل بريدك الإلكتروني"
          className="w-full py-4 px-12 pr-12 rounded-xl border-2 border-border bg-card text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
          dir="ltr"
        />
      </motion.div>

      {/* Checkboxes */}
      <motion.div 
        className="space-y-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {checkboxes.map((checkbox) => (
          <label
            key={checkbox.id}
            className="flex items-start gap-3 cursor-pointer group"
          >
            <div
              onClick={() => toggleCheckbox(checkbox.id)}
              className={`
                mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all
                ${checked[checkbox.id] 
                  ? 'bg-primary border-primary' 
                  : 'border-border group-hover:border-primary/50'
                }
              `}
            >
              {checked[checkbox.id] && (
                <motion.svg
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-3 h-3 text-primary-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              )}
            </div>
            <span className="text-sm text-foreground">
              {checkbox.label}
              {checkbox.required && <span className="text-destructive">*</span>}
            </span>
          </label>
        ))}
      </motion.div>

      {error && (
        <p className="text-destructive text-sm text-center">{error}</p>
      )}

      {/* Submit Button */}
      <motion.button
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={`
          w-full py-4 px-6 rounded-2xl font-semibold text-lg
          transition-all duration-300
          ${canSubmit 
            ? 'gradient-primary text-primary-foreground shadow-soft' 
            : 'bg-muted text-muted-foreground cursor-not-allowed'
          }
        `}
        whileHover={canSubmit ? { scale: 1.02 } : {}}
        whileTap={canSubmit ? { scale: 0.98 } : {}}
      >
        {isLoading ? 'جاري الإرسال...' : 'احصل على خطتك'}
      </motion.button>
    </motion.div>
  );
}
