import { sendNotification } from '@tauri-apps/api/notification'
import { useEffect, useRef, useState } from 'react'
import { invoke } from '@tauri-apps/api/tauri';
import { BREAK_TIME_NOTIFICATION, FOCUS_TIME_NOTIFICATION, NOTIFICATION_TITLE } from '../constants'
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

export const useChronowise = ({focusTime, shortBreakTime, longBreakTime, cycles}: IUsePomodoroProps) => {
  const [cycle, setCycle] = useState(1);
  const [timeLeft, setTimeLeft] = useState(focusTime);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isPaused, setIsPaused] = useState(true);
  const [isBreak, setIsBreak] = useState(false);
  const [percentLeft, setPercentLeft] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const playNotificationSound = async () => {
    await invoke("play_notification_sound");
  }

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
            sendNotification({
              title: NOTIFICATION_TITLE,
              body: FOCUS_TIME_NOTIFICATION,
            });
            playNotificationSound();
          } else {
            setIsBreak(true);
            setTimeLeft(cycle !== 4 ? shortBreakTime : longBreakTime);
            setIsPaused(true);
            sendNotification({
              title: NOTIFICATION_TITLE,
              body: BREAK_TIME_NOTIFICATION,
            });
            playNotificationSound();
          }
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(id);
    intervalRef.current = id;
  };

  useEffect(() => {
    const currentTimerTime = isBreak ? (cycle !== 4 ? shortBreakTime : longBreakTime): focusTime;
    
    setPercentLeft(100 - (timeLeft / currentTimerTime) * 100);
  }, [timeLeft])

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
    percentLeft,
    start: handleStartClick,
    pause: handlePauseClick,
    resume: handleResumeClick,
    reset: handleResetClick
  }
}



