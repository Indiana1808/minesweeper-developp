import { createContext, SetStateAction } from 'react';
import { BoardCase, Difficulty, Score } from './types';
import { baseDifficulty } from './constants';

export const GameContext = createContext({
    difficulty: baseDifficulty as Difficulty,
    setDifficulty: (difficulty: SetStateAction<Difficulty>) => {},

    isStart: false as boolean,
    setIsStart: (isStart: SetStateAction<boolean>) => {},

    counter: new Date(0) as Date,
    setCounter: (counter: SetStateAction<Date>) => {},

    grid: [] as BoardCase[][],
    setGrid: (grid: SetStateAction<BoardCase[][]>) => {},

    isOver: false as boolean,
    setIsOver: (isOver: SetStateAction<boolean>) => {},

    scores: [] as Score[],
    setScores: (scores: SetStateAction<Score[]>) => {}
});