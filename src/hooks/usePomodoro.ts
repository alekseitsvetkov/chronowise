import {useEffect, useState} from 'react'

interface IUsePomodoroProps {
  focusTimeInterval: number
  breakTimeInterval: number
  longBreakTimeInterval: number
}

interface IPomodoroStep {
  focus: boolean;
  break: boolean;
  focusTimeInterval: number;
  breakTimeInterval: number;
}

export const usePomodoro = ({focusTimeInterval, breakTimeInterval, longBreakTimeInterval}: IUsePomodoroProps) => {
  const DEFAULT_STEPS: IPomodoroStep[] = [
    {
      focus: false,
      break: false,
      focusTimeInterval,
      breakTimeInterval
    },
    {
      focus: false,
      break: false,
      focusTimeInterval,
      breakTimeInterval
    },
    {
      focus: false,
      break: false,
      focusTimeInterval,
      breakTimeInterval
    },
    {
      focus: false,
      break: false,
      focusTimeInterval,
      breakTimeInterval: longBreakTimeInterval
    }
  ]

  const [isRunning, setIsRunning] = useState(false)
  const [steps, setSteps] = useState<IPomodoroStep[]>(DEFAULT_STEPS)
  const [currentTimeInterval, setCurrentTimeInterval] = useState(focusTimeInterval)
  
  const start = () => {
    setIsRunning(true)
  }

  const pause = () => {
    setIsRunning(false)
  }

  const reset = () => {
    setIsRunning(false)
    setCurrentTimeInterval(focusTimeInterval)
    setSteps(DEFAULT_STEPS)
  }

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setCurrentTimeInterval(currentTimeInterval - 1000)
      }, 1000)

      
      return () => clearInterval(interval)
    }
  }, [isRunning, currentTimeInterval])

  return {
    isRunning, timeInterval: currentTimeInterval, start, pause, reset, steps
  }
}



