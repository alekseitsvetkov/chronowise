import clsx from "clsx";
import {FC} from "react";
import {usePomodoro} from "./hooks";
import {secondsToTime} from "./utils";

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 30 * 60;
const CYCLES = 4;

const App: FC = () => {
  const {
    cycle,
    isBreak,
    isPaused,
    timeLeft,
    start,
    pause,
    resume,
    reset
  } = usePomodoro({
    focusTime: FOCUS_TIME,
    shortBreakTime: SHORT_BREAK_TIME,
    longBreakTime: LONG_BREAK_TIME,
    cycles: CYCLES
  });

  return (
    <div className="container">
      <div className="timer-info">
        <div>{isBreak ? "Break Time" : "Focus Time"}</div>
      </div>
      <div className="time">
        <div>{secondsToTime(timeLeft)}</div>
      </div>
      <div className="progress">
        {Array.from({ length: CYCLES }, (_, i) => (
          <div
            key={i} 
            className={clsx("progress-item",
              cycle - 1 >= i && "half",
              cycle - 1 >= i && isBreak && "done",
              cycle - 1 >= i + 1 && "done",
            )}
          />
        ))}
      </div>
      <div className="row">
        <button className="action" onClick={isPaused ? start : pause}>
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button className="action" onClick={reset}>Reset</button>
      </div>
    </div>
  );
};

export default App;