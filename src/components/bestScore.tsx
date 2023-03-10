import { useContext, useState, useEffect } from "react";
import { Header } from "semantic-ui-react";
import { GameContext } from "../contexts";
import { getBestScore, getUTCTime } from "../helpers";
import { Score } from "../types";

export default function TimeCounter() {

    const {difficulty, scores} = useContext(GameContext);

    const [bestScore, setBestScore] = useState<Score | undefined>(undefined);

    useEffect(() => {
        setBestScore(getBestScore(scores, difficulty))
    }, [difficulty, scores])

    return (
        <Header 
        style={{
          
            width: '100px', 
            height: '48px', 
            color: '#ff0701', 
            background: 'black', 
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            
            //fontSize: '12px'
        
            
            }}
        color={bestScore && "yellow"} content={(bestScore && "🏆 " + getUTCTime(new Date(bestScore.time))) || "No score"} />
    )
}