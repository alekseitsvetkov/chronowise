import { useMemo, useState } from "react";
import dayjs from "dayjs";
import "./App.css";
import { useCountdown } from "./hooks";

const FOCUS_TIME_MINUTES = 25;
const FOCUS_TIME_SECONDS = FOCUS_TIME_MINUTES * 60;
const ONE_SECOND = 1000;

function App() {
  const [counter, isRunning, start, reset, pause, stop] = useCountdown({
    from: FOCUS_TIME_SECONDS,
    to: 0,
    interval: ONE_SECOND,
  });

  const counterToDisplay = useMemo(() => {
    return dayjs(counter * 1000).format("mm:ss");
  }, [counter]);

  return (
    <div className="container">
      <h1>Pomodoro</h1>

      <div className="row">
          <img src="/pomodoro.png" className="image pomodoro" alt="Pomodoro image" height="140" />
      </div>

      {!isRunning && (
          <p className="mainText">Press "Start" to begin the session</p>
      )}

      {isRunning && (
        <p className="mainText time">{counterToDisplay}</p>
      )}

      <div className="row">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            !isRunning ? start(): stop();
          }}
        >
          <button type="submit">{!isRunning ? 'Start' : 'Stop'}</button>
        </form>
      </div>
    </div>
  );
}

export default App;
