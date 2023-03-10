import { useContext } from "react";
import { DropdownItemProps, DropdownProps, Form, Select } from "semantic-ui-react";
import { difficulties } from "../constants";
import { GameContext } from "../contexts";

export default function DifficultySelector() {

    const { isStart, difficulty, setDifficulty } = useContext(GameContext);

    const defaultValue = (difficulty ?? {key: undefined})?.key;

    const options: DropdownItemProps[] = difficulties.map(row => {return {value: row.key, text: row.name}});

    const handleSelectChange = (_event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => {
        if (typeof(data.value) === "number") setDifficulty(difficulties[data.value])
    }

    return (
        <Form>
            <Select 
              style={{
                
                height: '48px', 
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
                
            
                
                }}
            
            disabled={isStart} defaultValue={defaultValue} onChange={handleSelectChange} options={options} />
        </Form>
    );
}