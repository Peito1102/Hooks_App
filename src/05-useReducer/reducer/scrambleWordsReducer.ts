import { GAME_WORDS, type ScrumbleAction, type ScrumbleState } from "../interfaces/ScrumbleState";

// Esta función mezcla el arreglo para que siempre sea aleatorio
const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = '') => {
  return word
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('');
};

// Estado inicial de la aplicación
export const getInitialScrumbleState = (): ScrumbleState => {
    const shuffledWords = shuffleArray(GAME_WORDS);
    const currentWord = shuffledWords[0];
    const scrambledWord = scrambleWord(currentWord);

    return {
        words: shuffledWords,
        points: 0,
        currentWord,
        scrambledWord,
        errorCounter: 0,
        maxAllowErrors: 3,
        skipCounter: 0,
        maxSkips: 3,
        isGameOver: false
    }
}

export const scrambleWordsReducer = (state: ScrumbleState, action: ScrumbleAction) : ScrumbleState => {

    switch (action.type) {
        case 'SUBMIT':{
            if (action.payload.toUpperCase().trim() !== state.currentWord) {
                if ( state.errorCounter + 1 >= state.maxAllowErrors ) {
                    return {
                        ...state,
                        isGameOver: true,
                        errorCounter: state.errorCounter + 1
                    };
                }
                return {
                    ...state,
                    errorCounter: state.errorCounter + 1
                };
            }
            const nextWord = state.words[1] || '';
            return {
                ...state,
                points: state.points + 1,
                words: state.words.slice(1),
                scrambledWord : scrambleWord(nextWord),
                currentWord: nextWord
            };
        }
        case 'SKIP': {
            const nextWord = state.words[1] || '';
            return {
                ...state,
                skipCounter: state.skipCounter + 1,
                words: state.words.slice(1),
                scrambledWord : scrambleWord(nextWord),
                currentWord: nextWord
            };
        }
        case 'RESET': {
            return getInitialScrumbleState();
        }

        default:
            return state;
    }
}