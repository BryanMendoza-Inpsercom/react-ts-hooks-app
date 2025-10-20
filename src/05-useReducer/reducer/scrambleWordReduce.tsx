export interface ScambleWordsState {
  currentWord: string;
  errorCounter: number;
  guess: string;
  isGameOver: boolean;
  maxAllowErrors: number;
  maxSkips: number;
  points: number;
  scrambledWord: string;
  skipCounter: number;
  words: string[];
  totalWords: number;
}

const shuffleArray = (array: string[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Esta función mezcla las letras de la palabra
const scrambleWord = (word: string = "") => {
  return word
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");
};

const GAME_WORDS = [
  "REACT",
  "JAVASCRIPT",
  "TYPESCRIPT",
  "HTML",
  "ANGULAR",
  "SOLID",
  "NODE",
  "VUEJS",
  "SVELTE",
  "EXPRESS",
  "MONGODB",
  "POSTGRES",
  "DOCKER",
  "KUBERNETES",
  "WEBPACK",
  "VITE",
  "TAILWIND",
];

export type ScrambleWordsActions =
  | { type: "SET_GUESS"; payload: string }
  | { type: "CHECHK_ANSWER" }
  | { type: "SKIP_WORD" }
  | { type: "PLAY_AGAIN"; payload: ScambleWordsState };

export const getInitialState = (): ScambleWordsState => {
  const listaPalabras = shuffleArray([...GAME_WORDS]);
  return {
    currentWord: listaPalabras[0],
    errorCounter: 0,
    guess: "",
    isGameOver: false,
    maxAllowErrors: 3,
    maxSkips: 3,
    points: 0,
    scrambledWord: listaPalabras[0],
    skipCounter: 0,
    words: listaPalabras,
    totalWords: listaPalabras.length,
  };
};

export const scrambleWordsReducer = (
  state: ScambleWordsState,
  action: ScrambleWordsActions
): ScambleWordsState => {
  switch (action.type) {
    case "SET_GUESS":
      return {
        ...state,
        guess: action.payload.trim().toUpperCase(),
      };
    case "CHECHK_ANSWER": {
      if (state.guess === state.currentWord) {
        const nuevaLista = state.words.filter(
          (palabra) => palabra != state.currentWord
        );
        const nuevaPalabra = nuevaLista[0];
        return {
          ...state,
          points: state.points + 1,
          currentWord: nuevaPalabra,
          scrambledWord: scrambleWord(nuevaPalabra),
          guess: "",
          words: nuevaLista,
        };
      }
      const numeroErrores = state.errorCounter + 1;
      return {
        ...state,
        errorCounter: numeroErrores,
        guess: "",
        isGameOver: numeroErrores === state.maxAllowErrors,
      };
    }
    case "SKIP_WORD": {
      const nuevoArrayPalabras = state.words.filter(
        (palabra) => palabra !== state.currentWord
      );
      const nuevaPalabra = nuevoArrayPalabras[0];
      return {
        ...state,
        currentWord: nuevaPalabra,
        scrambledWord: scrambleWord(nuevaPalabra),
        guess: "",
        skipCounter: state.skipCounter + 1,
        words: nuevoArrayPalabras,
      };
    }
    case "PLAY_AGAIN": {
      return action.payload;
    }

    default:
      return state;
  }
};
