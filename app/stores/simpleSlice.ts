import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './store-storage';

export interface SimpleState {
  team1Scores: number[];
  team2Scores: number[];
  addTeam1Score: (scoreToAdd: number) => void;
  addTeam2Score: (scoreToAdd: number) => void;
  resetScores: () => void;
}

export const useSimpleStore = create<SimpleState>()(
  persist(
    (set, get) => ({
      team1Scores: [],
      team2Scores: [],
      addTeam1Score: (scoreToAdd: number) => set({ team1Scores: [...get().team1Scores, scoreToAdd], team2Scores:[...get().team2Scores, 0]}),
      addTeam2Score: (scoreToAdd: number) => set({ team1Scores: [...get().team1Scores, 0], team2Scores:[...get().team2Scores, scoreToAdd]}),
      resetScores: () => set({ team1Scores: [], team2Scores: [] }),
    }),
    {
      name: 'simple-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);
