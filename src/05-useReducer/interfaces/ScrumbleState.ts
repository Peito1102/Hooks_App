export interface ScrumbleState {
    words: string[];
    points: number;
    currentWord: string;
    scrambledWord: string;
    errorCounter: number;
    maxAllowErrors: number;
    skipCounter: number;
    maxSkips: number;
    isGameOver: boolean;
}

export type ScrumbleAction = { type: 'SUBMIT', payload: string } | { type: 'RESET' } | { type: 'SKIP' };

export const GAME_WORDS = [
  'REACT',
  'JAVASCRIPT',
  'TYPESCRIPT',
  'HTML',
  'ANGULAR',
  'SOLID',
  'NODE',
  'VUEJS',
  'SVELTE',
  'EXPRESS',
  'MONGODB',
  'POSTGRES',
  'DOCKER',
  'KUBERNETES',
  'WEBPACK',
  'VITE',
  'TAILWIND',
];