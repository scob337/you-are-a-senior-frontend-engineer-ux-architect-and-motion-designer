import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search, Check } from 'lucide-react';
import { ContinueButton } from '@/components/assessment/ContinueButton';

interface Language {
  id: string;
  label: string;
  nativeLabel: string;
  icon?: string;
}

const languages: Language[] = [
  { id: 'ar', label: 'العربية', nativeLabel: 'العربية', icon: '🇸🇦' },
  { id: 'en', label: 'الإنجليزية', nativeLabel: 'English', icon: '🇬🇧' },
  { id: 'fr', label: 'الفرنسية', nativeLabel: 'Français', icon: '🇫🇷' },
  { id: 'es', label: 'الإسبانية', nativeLabel: 'Español', icon: '🇪🇸' },
  { id: 'de', label: 'الألمانية', nativeLabel: 'Deutsch', icon: '🇩🇪' },
  { id: 'it', label: 'الإيطالية', nativeLabel: 'Italiano', icon: '🇮🇹' },
  { id: 'pt', label: 'البرتغالية', nativeLabel: 'Português', icon: '🇵🇹' },
  { id: 'ru', label: 'الروسية', nativeLabel: 'Русский', icon: '🇷🇺' },
  { id: 'zh', label: 'الصينية', nativeLabel: '中文', icon: '🇨🇳' },
  { id: 'ja', label: 'اليابانية', nativeLabel: '日本語', icon: '🇯🇵' },
  { id: 'ko', label: 'الكورية', nativeLabel: '한국어', icon: '🇰🇷' },
  { id: 'hi', label: 'الهندية', nativeLabel: 'हिन्दी', icon: '🇮🇳' },
  { id: 'tr', label: 'التركية', nativeLabel: 'Türkçe', icon: '🇹🇷' },
  { id: 'ur', label: 'الأردية', nativeLabel: 'اردو', icon: '🇵🇰' },
  { id: 'fa', label: 'الفارسية', nativeLabel: 'فارسی', icon: '🇮🇷' },
  { id: 'other', label: 'لغة أخرى', nativeLabel: 'Other', icon: '🌍' },
];

interface LanguageSelectStepProps {
  question: string;
  onComplete: (answer: string) => void;
}

export function LanguageSelectStep({ question, onComplete }: LanguageSelectStepProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<Language | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLanguages = useMemo(() => {
    if (!searchQuery) return languages;
    const query = searchQuery.toLowerCase();
    return languages.filter(
      lang =>
        lang.label.toLowerCase().includes(query) ||
        lang.nativeLabel.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const handleSelect = (lang: Language) => {
    setSelected(lang);
    setIsOpen(false);
    setSearchQuery('');
  };

  return (
    <motion.div
      className="flex flex-col gap-6"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2
        className="text-2xl font-bold text-foreground text-center mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {question}
      </motion.h2>

      <motion.div
        className="relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Dropdown Trigger */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full p-4 rounded-2xl border-2 bg-card text-right
            flex items-center justify-between gap-3
            transition-all duration-300
            ${isOpen ? 'border-primary shadow-soft' : 'border-border hover:border-primary/50'}
          `}
          whileTap={{ scale: 0.99 }}
        >
          {selected ? (
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selected.icon}</span>
              <div className="flex flex-col items-start">
                <span className="font-semibold text-foreground">{selected.label}</span>
                <span className="text-sm text-muted-foreground">{selected.nativeLabel}</span>
              </div>
            </div>
          ) : (
            <span className="text-muted-foreground">اختر لغتك الأم</span>
          )}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.button>

        {/* Dropdown Menu */}
        {isOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border-2 border-border rounded-2xl shadow-elevated overflow-hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Search Input */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث عن لغتك..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10 pl-4 py-3 bg-secondary/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  autoFocus
                />
              </div>
            </div>

            {/* Language List */}
            <div className="max-h-64 overflow-y-auto">
              {filteredLanguages.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">
                  لم يتم العثور على نتائج
                </div>
              ) : (
                filteredLanguages.map((lang) => (
                  <motion.button
                    key={lang.id}
                    onClick={() => handleSelect(lang)}
                    className={`
                      w-full p-3 flex items-center gap-3 text-right
                      transition-colors duration-200
                      ${selected?.id === lang.id ? 'bg-primary/10' : 'hover:bg-secondary/50'}
                    `}
                    whileHover={{ x: -5 }}
                  >
                    <span className="text-xl">{lang.icon}</span>
                    <div className="flex flex-col items-start flex-1">
                      <span className="font-medium text-foreground">{lang.label}</span>
                      <span className="text-sm text-muted-foreground">{lang.nativeLabel}</span>
                    </div>
                    {selected?.id === lang.id && (
                      <Check className="w-5 h-5 text-primary" />
                    )}
                  </motion.button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </motion.div>

      <ContinueButton
        onClick={() => selected && onComplete(selected.id)}
        disabled={!selected}
      />
    </motion.div>
  );
}
