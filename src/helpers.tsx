import { cloneDeep } from "lodash";
import { SetStateAction } from "react";
import { SemanticICONS } from "semantic-ui-react";
import { localStorageScore, loopAround } from "./constants";
import { BoardCase, Difficulty, Position, Score } from "./types";

export const setLocalScores = (scores: Score[]) => localStorage.setItem(localStorageScore, JSON.stringify(scores));

export const sortLocalScores = ((a: Score, b: Score) => a.time - b.time);

export const getLocalScores = (): Score[] => JSON.parse(localStorage.getItem(localStorageScore) || "[]").sort(sortLocalScores);

export const getLevelScores = (scores: Score[], difficulty: Difficulty) => scores.filter(score => score.level === difficulty.key);

export const getBestScore = (scores: Score[], difficulty: Difficulty) => getLevelScores(scores, difficulty)[0];

export const getUTCTime = (counter: Date) => {
    const hours = counter.getUTCHours().toString().padStart(2, "0");
    const minutes = counter.getUTCMinutes().toString().padStart(2, "0");
    const seconds = counter.getUTCSeconds().toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`
}

export const isWin = (grid: BoardCase[][], difficulty: Difficulty) => {
    const minesSpot = grid.flat().filter(element => element.bomb && element.status === "flag");
    return minesSpot.length === difficulty.mines;
}

export const isLoose = (grid: BoardCase[][]) => {
    const mineExplode = grid.flat().some(element => element.bomb && element.color === "red");
    return mineExplode;
}

export const addAround = (grid: BoardCase[][], row: number, col: number, board: number) => {
    const limit = board - 1;

    if (row === 0 && col === 0) {
        // top left
        grid[row][col + 1].around++;
        grid[row + 1][col].around++;
        grid[row + 1][col + 1].around++;
    } else if (row === 0 && col === limit) {
        // top right
        grid[row][col - 1].around++;
        grid[row + 1][col].around++;
        grid[row + 1][col - 1].around++;
    } else if (row === limit && col === 0) {
        // bottom left
        grid[row][col + 1].around++;
        grid[row - 1][col].around++;
        grid[row - 1][col + 1].around++;
    } else if (row === limit && col === limit) {
        // bottom right
        grid[row][col - 1].around++;
        grid[row - 1][col].around++;
        grid[row - 1][col - 1].around++;
    } else if (row === 0) {
        // center top
        grid[row][col - 1].around++;
        grid[row][col + 1].around++;
        grid[row + 1][col - 1].around++;
        grid[row + 1][col].around++;
        grid[row + 1][col + 1].around++;
    } else if (row === limit) {
        // center bottom
        grid[row - 1][col - 1].around++;
        grid[row - 1][col].around++;
        grid[row - 1][col + 1].around++;
        grid[row][col - 1].around++;
        grid[row][col + 1].around++;
    } else if (col === 0) {
        // center left
        grid[row - 1][col].around++;
        grid[row - 1][col + 1].around++;
        grid[row][col + 1].around++;
        grid[row + 1][col].around++;
        grid[row + 1][col + 1].around++;
    } else if (col === limit) {
        // center right
        grid[row - 1][col - 1].around++;
        grid[row - 1][col].around++;
        grid[row][col - 1].around++;
        grid[row + 1][col - 1].around++;
        grid[row + 1][col].around++;
    } else {
        // center
        grid[row - 1][col - 1].around++;
        grid[row - 1][col].around++;
        grid[row - 1][col + 1].around++;
        grid[row][col - 1].around++;
        grid[row][col + 1].around++;
        grid[row + 1][col - 1].around++;
        grid[row + 1][col].around++;
        grid[row + 1][col + 1].around++;
    }
    return grid;
};

export const randMines = (board: number): number => Math.floor(Math.random() * board);

export const setupMines = (grid: BoardCase[][], board: number, totalMines: number): BoardCase[][] => {
    for (let mines = 0; mines < totalMines; mines++) {
        const [row, col] = [randMines(board), randMines(board)];

        if (!grid[row][col].bomb) {
            grid[row][col].bomb = true;
            grid = addAround(grid, row, col, board);
        } else mines--;
    }

    return grid;
};

export const resetGrid = (board: number, totalMines: number): BoardCase[][] => {

    const newGrid = Array.from({length: board}, () => Array.from({length: board}, (): BoardCase => ({'bomb': false,'status': "square", 'color': undefined, 'around': 0})));

    return setupMines(newGrid, board, totalMines);
};

export const flagsCounter = (grid: BoardCase[][]): number => {
    const boardCaseWithFlag = grid.flat().filter(boardCase => boardCase.status === "flag");
    return boardCaseWithFlag.length
};

export const poseFlag = (setGrid: (grid: SetStateAction<BoardCase[][]>) => void, grid: BoardCase[][], difficulty: Difficulty, row: number, col: number, status: SemanticICONS) => {
    setGrid((oldGrid: BoardCase[][]) => {
        const newGrid = cloneDeep(oldGrid);

        const boardCase = grid[row][col];

        if (!["square", "flag"].includes(boardCase.status)) return oldGrid;

        if (status === 'flag') {
            boardCase.status = 'square';
            boardCase.color = undefined;
        }

        if (status === 'square' && flagsCounter(grid) < difficulty.mines) {
            boardCase.status = 'flag';
            boardCase.color = 'blue';
        }

        return newGrid;
    })
};

export const revealSpreading = (newGrid: BoardCase[][], row: number, col: number, board: number) => {
    const limit = board - 1;

    const setNewGrid = (e: BoardCase[][]) => newGrid = e;

    if (row < 0 || row > limit || col < 0 || col > limit) return newGrid;

    const boardCase = newGrid[row][col];

    if (boardCase.color === "black") return newGrid;

    boardCase.status = "square outline";
    boardCase.color = "black";

    if (boardCase.around === 0) {
        loopAround.forEach((pos: Position) => {
            setNewGrid(revealSpreading(newGrid, row + pos.row, col + pos.col, board));
        })
    }

    return newGrid;
};

export const revealCase = (setGrid: (grid: SetStateAction<BoardCase[][]>) => void, grid: BoardCase[][], row: number, col: number, status: SemanticICONS, bomb: boolean, board: number) => {
    setGrid((oldGrid: BoardCase[][]) => {
        const newGrid = cloneDeep(oldGrid);

        const boardCase = grid[row][col];

        if (!["square", "bomb"].includes(status)) return oldGrid;

        if (bomb) {
            boardCase.status = "bomb";
            boardCase.color = "red";
            return newGrid;
        }

        return revealSpreading(newGrid, row, col, board);
    })
};