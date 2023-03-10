import { useContext, useState } from "react";
import { Button, Modal, Header, SemanticCOLORS } from "semantic-ui-react"; 
import { GameContext } from "../contexts";
import { resetGrid } from "../helpers";

export default function StartButton() {

    const { isStart, setIsStart, setCounter, difficulty, setIsOver, setGrid } = useContext(GameContext);

    const colorButton: SemanticCOLORS = isStart ? 'red' : 'blue';

    const textButton: string = isStart ? "Stop" : "Start";

    const [openModal, setOpenModal] = useState<boolean>(false);

    const handleSwitch = () => {
        if (isStart) setOpenModal(!openModal);
        else {
            setCounter(new Date(0))
            setIsStart(true);
            setIsOver(false);
            setGrid(resetGrid(difficulty.board, difficulty.mines));
        };
    }

    const handleClose = () => setOpenModal(false);

    const handleConfirm = () => {
        setOpenModal(false);
        setIsStart(false);
    }

    return (
        <>
            <Button 
            style={{
               
                borderWidth: '4px',
                borderStyle: 'solid',
                borderRightColor: '#7b7b7b',
                borderBottomColor: '#7b7b7b',
                borderLeftColor: 'white',
                borderTopColor: 'white',
                display: 'flex',
                justifyContent: "center",
                alignItems: "center", 
                cursor: 'pointer',
                background: '#c2c2c2',
                fontSize: '13px',
                color: 'black'
                
                }}
            color={colorButton} onClick={handleSwitch}>{textButton}</Button>
            <Modal basic onClose={handleClose} open={openModal} size='mini'>
                <Header>Are you sure to give up this game ?</Header>
                <Modal.Actions>
                    <Button color='red' inverted onClick={handleClose}>Cancel</Button>
                    <Button inverted onClick={handleConfirm}>Confirm</Button>
                </Modal.Actions>
            </Modal>
        </>
    );
}