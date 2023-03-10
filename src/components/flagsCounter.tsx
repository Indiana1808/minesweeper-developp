import { useContext } from "react";
import { Header, Icon } from "semantic-ui-react";
import { GameContext } from "../contexts";
import { flagsCounter } from "../helpers";

export default function FlagsCounter() {

    const {grid, difficulty} = useContext(GameContext);

    const getFlagsCounter = (): string => {
        const length = difficulty.mines.toString().length;
        const flags = flagsCounter(grid).toString().padStart(length, "0");
        return `${flags} / ${difficulty.mines}`
    };

    return (
        <Header 
        style={{
            width: '120px', 
            height: '48px', 
            display: 'flex',
            justifyContent: "center",
            alignItems: "center", 
            cursor: 'pointer',
            background: '#c2c2c2',
            fontSize: '13px',
        
            }}
        >
            <Icon name='flag' />
            <Header.Content content={getFlagsCounter()} />
            <Icon name='bomb' />
        </Header>
    )
}