import { useContext, useEffect } from "react";
import { Header } from "semantic-ui-react";
import { GameContext } from "../contexts";
import { getUTCTime } from "../helpers";

export default function TimeCounter() {

    const {isStart, counter, setCounter} = useContext(GameContext);

    const addSecond = (oldCounter: Date) => {
        const newCounter = new Date(oldCounter);
        newCounter.setSeconds(newCounter.getSeconds() + 1)
        return newCounter
    }

    useEffect(() => {
        if (isStart) {
            const interval = setInterval(() => {
                setCounter(addSecond(counter));
            }, 1000)
            return () => clearInterval(interval);
        }
    }, [setCounter, counter, isStart])

    return (
       
         <Header 
         style={{
          
            width: '80px', 
            height: '48px', 
            color: '#ff0701', 
            background: 'black', 
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
            
            //fontSize: '12px'
        
            
            }}
         content={getUTCTime(counter)} />

        
    )
}