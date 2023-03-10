import { SemanticCOLORS, SemanticICONS } from "semantic-ui-react";

export type Difficulty = {
    key: number,
    name: string,
    board: number,
    mines: number
};

export type BoardCase = {
    bomb: boolean,
    status: SemanticICONS & ("flag" | "square" | "bomb" | "square outline"),
    color: SemanticCOLORS & ("red" | "black" | "blue") | undefined,
    around: number
};

export type Position = {
    row: number,
    col: number
};
    
export type Score = {
    pseudo: string,
    level: Difficulty['key'],
    time: number,
};