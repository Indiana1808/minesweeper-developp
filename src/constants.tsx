import { Difficulty, Position } from "./types";

export const difficulties: Difficulty[] = [
    {name: "Beginner", board: 9, mines: 10},
    {name: "Medium", board: 16, mines: 40},
    {name: "Hard", board: 22, mines: 100},
    {name: "Master", board: 30, mines: 250}
].map((values, index: number) => {return {key: index, ...values}});

export const baseDifficulty: Difficulty = difficulties[0];

export const loopAround: Position[] = [
    {row: -1, col: -1},
    {row: -1, col: 0},
    {row: -1, col: 1},
    {row: 0, col: -1},
    {row: 0, col: 1},
    {row: 1, col: -1},
    {row: 1, col: 0},
    {row: 1, col : 1}
]

export const localStorageScore = 'Minesweeper Scores';