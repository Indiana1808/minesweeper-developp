import './App.scss';
import { useState, useEffect } from 'react';
import { Segment } from 'semantic-ui-react';
import DifficultySelector from './components/difficultySelector';
import StartButton from './components/startButton';
import TimeCounter from './components/timeCounter';
import BestScore from './components/bestScore';
import FlagsCounter from './components/flagsCounter';
import IsOverModal from './components/isOverModal';
import Board from './components/board';
import { GameContext } from './contexts';
import { BoardCase, Difficulty, Score } from './types';
import { baseDifficulty } from './constants';
import { isWin, isLoose, resetGrid, setLocalScores, getLocalScores } from './helpers';

export default function App() {
  const [difficulty, setDifficulty] = useState<Difficulty>(baseDifficulty);
  const [isStart, setIsStart] = useState<boolean>(false);
  const [counter, setCounter] = useState<Date>(new Date(0));
  const [grid, setGrid] = useState<BoardCase[][]>(resetGrid(difficulty.board, difficulty.mines));
  const [isOver, setIsOver] = useState<boolean>(false);
  const [scores, setScores] = useState<Score[]>(getLocalScores());

  useEffect(() => {
    setGrid(resetGrid(difficulty.board, difficulty.mines));
  }, [difficulty]);

  useEffect(() => {
    if (isWin(grid, difficulty) || isLoose(grid)) {
      setIsOver(true);
      setIsStart(false);
    }
  }, [grid, difficulty]);

  useEffect(() => {
    setLocalScores(scores);
  }, [scores]);

  const values = {difficulty, setDifficulty, isStart, setIsStart, counter, setCounter, grid, setGrid, isOver, setIsOver, scores, setScores};

  return (
    <div className="App-nonSelect">
      <header className="App-header">
        <div className='segments'>
            <GameContext.Provider value={values}>
                  {/* <div className='divise'> */}
              
                      <Segment.Group horizontal className='divise'>
                        {[
                          <DifficultySelector />,
                          <TimeCounter />,
                          <FlagsCounter />,
                          <BestScore />,
                          <StartButton />
                        ].map((component, index) => <Segment key={"segment" + index} textAlign='center' >{component}</Segment>)}
                      
                      </Segment.Group>
                  {/* </div> */}
                <div className='body'>
                  <Board />
                  <IsOverModal />
                </div>
            </GameContext.Provider>
        </div>
      </header>
    </div>
  );
}