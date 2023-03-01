import {useEffect, useState} from 'react'

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
  const [timerType, setTimerType] = useState<TimerType>(TimerType.Pomodoro);
  const [cycle, setCycle] = useState(1);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const startTimer = () => {
      setIsRunning(true);
      intervalId = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    };

    const stopTimer = () => {
      setIsRunning(false);
      clearInterval(intervalId);
    };

    const resetTimer = () => {
      setIsRunning(false);
      setTimerType(TimerType.Pomodoro);
      setCycle(1);
      setTimeLeft(focusTime);
    };

    if (timeLeft === 0) {
      if (timerType === TimerType.Pomodoro) {
        if (cycle === cycles) {
          setCycle(1);
          setTimerType(TimerType.LongBreak);
          setTimeLeft(longBreakTime);
        } else {
          setCycle(cycle + 1);
          setTimerType(TimerType.ShortBreak);
          setTimeLeft(shortBreakTime);
        }
      } else {
        setTimerType(TimerType.Pomodoro);
        setTimeLeft(focusTime);
      }
    }

    if (isRunning) {
      startTimer();
    } else {
      stopTimer();
    }

    return resetTimer;
  }, [timeLeft, isRunning, cycle, timerType]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  return {
    isRunning,
    timerType,
    timeLeft,
    cycle,
    start: handleStart,
    pause: handlePause,
  }
}



