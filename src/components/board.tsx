import { useContext } from "react";
import { GameContext } from "../contexts";
import { Icon } from 'semantic-ui-react';
import { BoardCase } from "../types";
import { poseFlag, revealCase } from "../helpers";

export default function Board() {

    const {difficulty, grid, setGrid, isStart, isOver} = useContext(GameContext);

    return (
        <table className="Board">
            {grid.map((row: BoardCase[], row_index) => (
                <tr className="Row" key={`Row_${row_index}`}>
                    {row.map((boardCase: BoardCase, col_index) => (
                        <td className="Col" key={`Row_${row_index}_Col_${col_index}`}
                            onContextMenu={(e) => {e.preventDefault(); isStart && poseFlag(setGrid, grid, difficulty, row_index, col_index, boardCase.status)}}
                            onClick={() => {isStart && !isOver && revealCase(setGrid, grid, row_index, col_index, boardCase.status, boardCase.bomb, difficulty.board)}}>
                            {
                                (
                                    boardCase.color !== 'black' &&
                                    <Icon style={{

                                        color : '#c2c2c2',
                                        display: 'flex',
                                        justifyContent: "center",
                                        alignItems: "center", 
                                        cursor: 'pointer',
                                        padding: '5px',
                                        borderWidth: '4px',
                                        borderStyle: 'solid',
                                        borderRightColor: '#999',
                                        borderBottomColor: '#999',
                                        borderLeftColor: 'white',
                                        borderTopColor: 'white',
                                        fontSize: '25px',
                                        
                                    }}
                                    name={boardCase.status} disabled={!isStart} color={boardCase.color}
                                    />
                                ) ||
                                <Icon>{boardCase.around > 0 && boardCase.around}</Icon>
                            }
                        </td>
                    ))}
                </tr>
            ))}
        </table>
    )
}