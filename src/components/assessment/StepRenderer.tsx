import { AnimatePresence } from 'framer-motion';
import { useAssessment } from '@/hooks/useAssessment';
import { ProgressBar } from './ProgressBar';
import { BackButton } from './BackButton';
import { LanguageSelectStep } from './steps/LanguageSelectStep';
import { CardGridSelectStep } from './steps/CardGridSelectStep';
import { CardSelectStep } from './steps/CardSelectStep';
import { InfoStep } from './steps/InfoStep';
import { SpeakingIntroStep } from './steps/SpeakingIntroStep';
import { DifficultyCheckStep } from './steps/DifficultyCheckStep';
import { InterestsSelectStep } from './steps/InterestsSelectStep';
import { VocabularyTestStep } from './steps/VocabularyTestStep';
import { InfoSimpleStep } from './steps/InfoSimpleStep';
import { InfoProgramStep } from './steps/InfoProgramStep';
import { AnalysisStep } from './steps/AnalysisStep';
import { EmailCaptureStep } from './steps/EmailCaptureStep';
import { ResultStep } from './steps/ResultStep';
import { NameInputStep } from './steps/NameInputStep';
import { ProgressChartStep } from './steps/ProgressChartStep';
import { RedirectStep } from './steps/RedirectStep';
import BefluentOffer from './steps/Offers/Offers';

export function StepRenderer() {
  const {
    state,
    setAnswer,
    addVocabularyScore,
    addDifficultyScore,
    setUserName,
    setUserEmail,
    calculateResults,
    nextStep,
    prevStep,
    getCurrentStepData,
    getProgress,
  } = useAssessment();

  const stepData = getCurrentStepData();

  if (!stepData) {
    return <div>Loading...</div>;
  }

  const handleComplete = (answer?: unknown) => {
    if (answer !== undefined) {
      setAnswer(stepData.id, answer);
    }
    nextStep();
  };

  const renderStep = () => {
    switch (stepData.type) {
      case 'single-select':
        // Step 1: Language selection with dropdown
        if (stepData.id === 1) {
          return (
            <LanguageSelectStep
              question={stepData.question || ''}
              onComplete={(answer) => handleComplete(answer)}
            />
          );
        }
        // Steps 4, 5, 7, 16: Card grid selection
        if ([4, 5, 7, 16].includes(stepData.id)) {
          return (
            <CardGridSelectStep
              question={stepData.question || ''}
              subtitle={stepData.subtitle}
              options={stepData.options || []}
              columns={stepData.id === 5 ? 3 : 2}
              requiresContinue={stepData.requiresContinue || false}
              onComplete={(answer) => handleComplete(answer)}
            />
          );
        }
        // Step 6: Auto-advance card grid
        if (stepData.id === 6) {
          return (
            <CardGridSelectStep
              question={stepData.question || ''}
              subtitle={stepData.subtitle}
              options={stepData.options || []}
              columns={2}
              requiresContinue={false}
              onComplete={(answer) => handleComplete(answer)}
            />
          );
        }
        return (
          <CardGridSelectStep
            question={stepData.question || ''}
            subtitle={stepData.subtitle}
            options={stepData.options || []}
            requiresContinue={stepData.requiresContinue || false}
            onComplete={(answer) => handleComplete(answer)}
          />
        );

      case 'card-select':
        return (
          <CardSelectStep
            question={stepData.question || ''}
            options={stepData.options || []}
            onComplete={(answer) => handleComplete(answer)}
          />
        );

      case 'info':
        return (
          <InfoStep
            title={stepData.title || ''}
            stats={stepData.stats}
            onComplete={() => handleComplete()}
          />
        );

      case 'speaking-intro':
        return (
          <SpeakingIntroStep
            title={stepData.title || ''}
            subtitle={stepData.subtitle || ''}
            onComplete={() => handleComplete()}
          />
        );

      case 'difficulty-check':
        return (
          <DifficultyCheckStep
            statement={stepData.statement || ''}
            question={stepData.question || ''}
            options={stepData.options || []}
            onComplete={(value) => {
              addDifficultyScore(value);
              handleComplete(value);
            }}
          />
        );

      case 'multi-select':
        return (
          <InterestsSelectStep
            question={stepData.question || ''}
            subtitle={stepData.subtitle}
            options={stepData.options || []}
            onComplete={(answers) => handleComplete(answers)}
          />
        );

      case 'vocabulary-test':
        return (
          <VocabularyTestStep
            title={stepData.title || ''}
            subtitle={stepData.subtitle || ''}
            words={stepData.words || []}
            onComplete={(count) => {
              addVocabularyScore(count);
              handleComplete(count);
            }}
          />
        );

      case 'info-simple':
        return (
          <InfoSimpleStep
            title={stepData.title || ''}
            subtitle={stepData.subtitle || ''}
            onComplete={() => handleComplete()}
          />
        );

      case 'info-program':
        return (
          <InfoProgramStep
            title={stepData.title || ''}
            subtitle={stepData.subtitle || ''}
            onComplete={() => handleComplete()}
          />
        );

      case 'analysis':
        return (
          <AnalysisStep
            phases={stepData.phases || []}
            popups={stepData.popups || []}
            testimonial={stepData.testimonial || { text: '', author: '' }}
            onComplete={() => {
              calculateResults();
              handleComplete();
            }}
          />
        );

      case 'email-capture':
        return (
          <EmailCaptureStep
            title={stepData.title || ''}
            badges={stepData.badges || []}
            checkboxes={stepData.checkboxes || []}
            onComplete={(email) => {
              setUserEmail(email);
              handleComplete(email);
            }}
          />
        );

      case 'result':
        return (
          <ResultStep
            title={stepData.title || ''}
            levels={stepData.levels || []}
            motivationalText={stepData.motivationalText || ''}
            estimatedLevel={state.estimatedLevel}
            estimatedVocabulary={state.estimatedVocabulary}
            onComplete={() => handleComplete()}
          />
        );

      case 'name-input':
        return (
          <NameInputStep
            title={stepData.title || ''}
            placeholder={stepData.placeholder || ''}
            onComplete={(name) => {
              setUserName(name);
              handleComplete(name);
            }}
          />
        );

      case 'progress-chart':
        return (
          <ProgressChartStep
            title={stepData.title || ''}
            chartData={stepData.chartData || { current: '', after4weeks: '', otherApps: '' }}
            userName={state.userName}
            estimatedLevel={state.estimatedLevel}
            onComplete={() => handleComplete()}
          />
        );

      case 'offers':
        return (
          <BefluentOffer
            onComplete={() => handleComplete()}
          />
        );

      case 'redirect':
        return (
          <RedirectStep
            redirectUrl={stepData.redirectUrl || 'https://learna.app'}
          />
        );

      default:
        return <div>Unknown step type: {stepData.type}</div>;
    }
  };

  const showBackButton = state.currentStep > 1 && !['analysis', 'redirect'].includes(stepData.type);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with Progress and Back Button */}
      {stepData.showProgress && (
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center gap-3 px-4 py-2">
            {showBackButton && <BackButton onClick={prevStep} />}
            <div className="flex-1">
              <ProgressBar progress={getProgress()} />
            </div>
          </div>
        </div>
      )}

      {/* Back button when no progress bar */}
      {!stepData.showProgress && showBackButton && (
        <div className="absolute top-4 right-4 z-10">
          <BackButton onClick={prevStep} />
        </div>
      )}

      {/* Step Content */}
      <div className="flex-1 flex flex-col justify-center px-4 py-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <div key={state.currentStep}>
            {renderStep()}
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}
