import React, { useState, useRef } from "react";

const FOCUS_TIME = 5;
const SHORT_BREAK_TIME = 2;
const LONG_BREAK_TIME = 10;
const CYCLES = 4;

const formatTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

const App: React.FC = () => {
  const [cycle, setCycle] = useState(0);
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsPaused(false);
    if (cycle === 0) {
      setCycle(1);
    }
    const id = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          if (isBreak) {
            setCycle((prevCycle) => {
              if (prevCycle === CYCLES) {
                return 1;
              }
              return prevCycle + 1;
            });
            setIsBreak(false);
            setTimeLeft(FOCUS_TIME);
            setIsPaused(true);
          } else {
            setIsBreak(true);
            setTimeLeft(cycle !== 4 ? SHORT_BREAK_TIME : LONG_BREAK_TIME);
            setIsPaused(true);
          }
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(id);
    intervalRef.current = id;
  };

  const pauseTimer = () => {
    setIsPaused(true);
    clearInterval(intervalRef.current as NodeJS.Timeout);
  };

  const resumeTimer = () => {
    startTimer();
  };

  const resetTimer = () => {
    setCycle(0);
    setTimeLeft(FOCUS_TIME);
    setIsBreak(false);
    clearInterval(intervalRef.current as NodeJS.Timeout);
    setIsPaused(true);
  };

  const handleStartClick = () => {
    startTimer();
  };

  const handlePauseClick = () => {
    pauseTimer();
  };

  const handleResumeClick = () => {
    resumeTimer();
  };

  const handleResetClick = () => {
    resetTimer();
  };

  console.log({isPaused})

  return (
    <div className="container">
      <div className="timer-info">
      {cycle !== 0 && <div>Cycle: {cycle}</div>}
      {cycle !== 0 && <div>{isBreak ? "Break Time" : "Focus Time"}</div>}
      </div>
      <div className="time">
        <div>{formatTime(timeLeft)}</div>
      </div>
      <div className="progress">
        
      </div>
      <div className="row">
        <button className="action" onClick={isPaused ? handleStartClick : handlePauseClick}>
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button className="action" onClick={handleResetClick}>Reset</button>
      </div>
    </div>
  );
};

export default App;