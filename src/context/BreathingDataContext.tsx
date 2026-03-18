import { createContext, useContext } from 'react';

export type Row = {
  t_sec: number;
  time?: string | number;
  norm: number;
  state?: string;
  participant_id: string;
};

export type Metrics = {
  breaths: number;
  bpm: number;
  compliance: number;
  meanDepth: number;
};

type ContextType = {
  rawData: Row[];
  cleanedData: Array<{ t_min: number; [key: string]: number | null }>;
  participants: string[];
  metrics: Record<string, Metrics>;
  latestOnly: boolean;
  setLatestOnly: (v: boolean) => void;
};

// ❗ IMPORTANT: starts as undefined
export const BreathingDataContext = createContext<ContextType | undefined>(undefined);

// ✅ Custom hook (this fixes your error)
export const useBreathingData = () => {
  const context = useContext(BreathingDataContext);

  if (!context) {
    throw new Error('useBreathingData must be used inside BreathingDataProvider');
  }

  return context;
};
