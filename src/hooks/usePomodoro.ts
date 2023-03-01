import {useEffect, useRef, useState} from 'react'

interface IUsePomodoroProps {
  focusTime: number
  shortBreakTime: number
  longBreakTime: number
  cycles: number
}

export enum TimerType {
  Pomodoro,
  ShortBreak,
  LongBreak,
}

export const usePomodoro = ({focusTime, shortBreakTime, longBreakTime, cycles}: IUsePomodoroProps) => {
  const [cycle, setCycle] = useState(1);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    setIsPaused(false);
    const id = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalRef.current as NodeJS.Timeout);
          if (isBreak) {
            setCycle((prevCycle) => {
              if (prevCycle === cycles) {
                return 1;
              }
              return prevCycle + 1;
            });
            setIsBreak(false);
            setTimeLeft(focusTime);
            setIsPaused(true);
          } else {
            setIsBreak(true);
            setTimeLeft(cycle !== 4 ? shortBreakTime : longBreakTime);
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
    setCycle(1);
    setTimeLeft(focusTime);
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

  return {
    cycle,
    isBreak,
    isPaused,
    timeLeft,
    start: handleStartClick,
    pause: handlePauseClick,
    resume: handleResumeClick,
    reset: handleResetClick
  }
}



