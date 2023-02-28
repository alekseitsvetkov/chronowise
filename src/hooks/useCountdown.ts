import { useCallback, useEffect, useRef, useState } from 'react';

import dayjs from 'dayjs';

interface IUseCountdownParams {
  from: number;
  to?: number;
  interval?: number;
}

export const useCountdown = ({ from, to, interval = 1000 }: IUseCountdownParams): [number, boolean, () => void, () => void, () => void, () => void] => {
  const [counter, setCounter] = useState<number>(from);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [startDateMs, setStartDateMs] = useState<number>(dayjs().valueOf());

  const intervalId = useRef<ReturnType<typeof setInterval> | undefined>();

  const start: () => void = () => {
    setIsRunning(!(to !== undefined && counter <= to));
  };

  const pause: () => void = () => setIsRunning(false);

  const reset: () => void = useCallback(() => {
    clearInterval(intervalId.current);
    setCounter(from);
  }, [from]);

  const stop = useCallback(() => {
    clearInterval(intervalId.current);
    setIsRunning(false);
    setCounter(from);
  }, []);

  useEffect(() => {
    isRunning && setStartDateMs(dayjs().valueOf());
  }, [isRunning]);

  useEffect(() => {
    intervalId.current = setInterval(() => {
      const currentDateMs = dayjs().valueOf();
      const diff = Math.abs(dayjs(startDateMs).diff(currentDateMs, 'seconds'));

      isRunning && setCounter(from - diff);

      if (to !== undefined && counter <= to + 1) {
        pause();
      }
    }, interval);

    return () => clearInterval(intervalId.current);
  }, [isRunning, counter, interval, to, reset, startDateMs, from]);

  return [counter, isRunning, start, reset, pause, stop];
};

export default useCountdown;