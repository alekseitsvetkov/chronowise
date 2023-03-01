import {useMemo} from "react";
import clsx from 'clsx';
import dayjs from "dayjs";
import "./App.css";
import {usePomodoro} from "./hooks";

const FOCUS_TIME_MS = 25 * 60 * 1000;
const BREAK_TIME_MS = 5 * 60 * 1000;
const LONG_BREAK_TIME_MS = 30 * 60 * 1000;
const MOCK_FOCUS_TIME_MS = 5 * 1000;
const MOCK_BREAK_TIME_MS = 2 * 1000;

function App() {
  const {isRunning, timeInterval, start, pause, reset, steps} = usePomodoro({
    focusTimeInterval: MOCK_FOCUS_TIME_MS,
    breakTimeInterval: MOCK_BREAK_TIME_MS,
    longBreakTimeInterval: LONG_BREAK_TIME_MS
  });

  const displayTimeInterval = useMemo(() => {
    return dayjs(timeInterval).format("mm:ss");
  }, [timeInterval]);

  const handleStart = () => !isRunning ? start() : pause();

  return (
    <div className="container">
      <div className="time">{displayTimeInterval}</div>
      <div className="progress">
        {steps.map((step, index) => {
          return <div className={
            clsx('progress-item', 
              step.focus && step.break && 'done' || step.focus && 'focus-done', 
            )
          } key={index}></div>
        })}
      </div>

      <div className="row">
          <button className="action" type="button" onClick={handleStart}>{!isRunning ? 'Start' : 'Pause'}</button>
          <button className="action"  type="button" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
