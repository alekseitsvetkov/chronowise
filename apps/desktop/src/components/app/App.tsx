import clsx from "clsx";
import { FC, RefObject, useCallback, useRef } from "react";
import { PlayIcon, PauseIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { useChronosphere } from "~/hooks";
import { secondsToTime } from "~/utils";

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 30 * 60;
const CYCLES = 4;

export const App: FC = () => {
  const audioRef: RefObject<HTMLAudioElement> = useRef(null);

  const playSound = useCallback(() => {
    audioRef?.current?.play();
  }, [audioRef]);

  const {
    cycle,
    isBreak,
    isPaused,
    timeLeft,
    start,
    pause,
    resume,
    reset
  } = useChronosphere({
    focusTime: FOCUS_TIME,
    shortBreakTime: SHORT_BREAK_TIME,
    longBreakTime: LONG_BREAK_TIME,
    cycles: CYCLES,
  });

  return (
    <div className="container">
      <div className="text timer-info">
        <div>{isBreak ? "Break Time" : "Focus Time"}</div>
      </div>
      <div className="text time">
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
          {isPaused ? <PlayIcon height={30} width={30} /> : <PauseIcon height={30} width={30} />}
        </button>
        <button className="action" onClick={reset}>
          <ArrowPathIcon height={30} width={30} />
        </button>
      </div>
    </div>
  );
};