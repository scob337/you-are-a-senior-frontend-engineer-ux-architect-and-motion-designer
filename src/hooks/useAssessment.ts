import { useState, useCallback } from 'react';
import stepsData from '@/data/steps.json';

export interface AssessmentState {
  currentStep: number;
  answers: Record<number, unknown>;
  vocabularyScores: number[];
  difficultyScores: number[];
  userName: string;
  userEmail: string;
  estimatedLevel: string;
  estimatedVocabulary: number;
}

const initialState: AssessmentState = {
  currentStep: 1,
  answers: {},
  vocabularyScores: [],
  difficultyScores: [],
  userName: '',
  userEmail: '',
  estimatedLevel: 'A1',
  estimatedVocabulary: 0,
};

export function useAssessment() {
  const [state, setState] = useState<AssessmentState>(() => {
    const saved = localStorage.getItem('learna-assessment');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialState;
      }
    }
    return initialState;
  });

  const totalSteps = stepsData.steps.length;

  const saveState = useCallback((newState: AssessmentState) => {
    localStorage.setItem('learna-assessment', JSON.stringify(newState));
    setState(newState);
  }, []);

  const setAnswer = useCallback((stepId: number, answer: unknown) => {
    const newState = {
      ...state,
      answers: { ...state.answers, [stepId]: answer },
    };
    saveState(newState);
  }, [state, saveState]);

  const addVocabularyScore = useCallback((count: number) => {
    const newState = {
      ...state,
      vocabularyScores: [...state.vocabularyScores, count],
    };
    saveState(newState);
  }, [state, saveState]);

  const addDifficultyScore = useCallback((score: number) => {
    const newState = {
      ...state,
      difficultyScores: [...state.difficultyScores, score],
    };
    saveState(newState);
  }, [state, saveState]);

  const setUserName = useCallback((name: string) => {
    localStorage.setItem('clientName', name);
    const newState = { ...state, userName: name };
    saveState(newState);
  }, [state, saveState]);

  const setUserEmail = useCallback((email: string) => {
    const newState = { ...state, userEmail: email };
    saveState(newState);
  }, [state, saveState]);

  const calculateResults = useCallback(() => {
    const totalVocab = state.vocabularyScores.reduce((a, b) => a + b, 0);
    const avgDifficulty = state.difficultyScores.length > 0
      ? state.difficultyScores.reduce((a, b) => a + b, 0) / state.difficultyScores.length
      : 1;
    
    let level = 'A1';
    let vocabEstimate = 500;

    if (totalVocab >= 50) {
      level = 'C1';
      vocabEstimate = 8000 + Math.floor(Math.random() * 2000);
    } else if (totalVocab >= 40) {
      level = 'B2';
      vocabEstimate = 5000 + Math.floor(Math.random() * 1500);
    } else if (totalVocab >= 30) {
      level = 'B1';
      vocabEstimate = 3000 + Math.floor(Math.random() * 1000);
    } else if (totalVocab >= 20) {
      level = 'A2';
      vocabEstimate = 1500 + Math.floor(Math.random() * 500);
    } else {
      level = 'A1';
      vocabEstimate = 500 + Math.floor(Math.random() * 300);
    }

    // Adjust based on difficulty
    if (avgDifficulty > 1.5) {
      const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
      const idx = levels.indexOf(level);
      if (idx > 0) {
        level = levels[idx - 1];
        vocabEstimate = Math.floor(vocabEstimate * 0.8);
      }
    }

    const newState = {
      ...state,
      estimatedLevel: level,
      estimatedVocabulary: vocabEstimate,
    };
    saveState(newState);

    return { level, vocabulary: vocabEstimate };
  }, [state, saveState]);

  const nextStep = useCallback(() => {
    if (state.currentStep < totalSteps) {
      const newState = { ...state, currentStep: state.currentStep + 1 };
      saveState(newState);
    }
  }, [state, totalSteps, saveState]);

  const prevStep = useCallback(() => {
    if (state.currentStep > 1) {
      const newState = { ...state, currentStep: state.currentStep - 1 };
      saveState(newState);
    }
  }, [state, saveState]);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= totalSteps) {
      const newState = { ...state, currentStep: step };
      saveState(newState);
    }
  }, [state, totalSteps, saveState]);

  const resetAssessment = useCallback(() => {
    localStorage.removeItem('learna-assessment');
    localStorage.removeItem('clientName');
    setState(initialState);
  }, []);

  const getCurrentStepData = useCallback(() => {
    return stepsData.steps.find(s => s.id === state.currentStep);
  }, [state.currentStep]);

  const getProgress = useCallback(() => {
    return Math.round((state.currentStep / totalSteps) * 100);
  }, [state.currentStep, totalSteps]);

  return {
    state,
    totalSteps,
    setAnswer,
    addVocabularyScore,
    addDifficultyScore,
    setUserName,
    setUserEmail,
    calculateResults,
    nextStep,
    prevStep,
    goToStep,
    resetAssessment,
    getCurrentStepData,
    getProgress,
  };
}
