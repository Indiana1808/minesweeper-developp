import { cloneDeep } from "lodash";
import { useContext, useState } from "react";
import { Button, Modal, Header, Form } from "semantic-ui-react"; 
import { GameContext } from "../contexts";
import { getUTCTime, isLoose } from "../helpers";
import { Score } from "../types";

export default function IsOverModal() {

    const { grid, difficulty, counter, isOver, setIsOver, scores, setScores } = useContext(GameContext);

    const [pseudo, setPseudo] = useState<string>("");

    const addScore = (oldScores: Score[], newScore: Score) => {
        const updateScore = cloneDeep(oldScores);
        updateScore.push(newScore);
        return updateScore
    }

    const handleClose = () => setIsOver(false);

    const handleSave = () => {
        const newScore: Score = { pseudo: pseudo, level: difficulty.key, time: Date.parse(counter.toString())}
        setScores(addScore(scores, newScore));
        setIsOver(false);
    };

    return (
        <Modal basic onClose={handleClose} open={isOver} size='mini'>
            <Header textAlign="center" as="h1">{isLoose(grid) ? "You Loose..." : `You Win in ${getUTCTime(counter)}`}</Header>
            {!isLoose(grid) && (
                <Form>
                    <hr/>
                    <h3 className="h3">Save your time score !!</h3>
                    <input name="pseudo" placeholder='Enter your name' onChange={(event) => setPseudo(event.target.value)} />
                </Form>
            )}
            <Modal.Actions>
                {!isLoose(grid) && <Button color='blue' onClick={handleSave}>Save</Button>}
                <Button inverted onClick={handleClose}>Close</Button>
            </Modal.Actions>
        </Modal>
    );
}