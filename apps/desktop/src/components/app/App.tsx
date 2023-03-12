import clsx from "clsx";
import { FC } from "react";
import { useChronosphere } from "~/hooks";
import { secondsToTime } from "~/utils";
import { Icons } from "@chronosphere/ui";
import { Line } from "rc-progress";

const FOCUS_TIME = 25 * 60;
const SHORT_BREAK_TIME = 5 * 60;
const LONG_BREAK_TIME = 15 * 60;
const CYCLES = 4;

export const App: FC = () => {
  const {
    cycle,
    isBreak,
    isPaused,
    timeLeft,
    percentLeft,
    start,
    pause,
    reset
  } = useChronosphere({
    focusTime: FOCUS_TIME,
    shortBreakTime: SHORT_BREAK_TIME,
    longBreakTime: LONG_BREAK_TIME,
    cycles: CYCLES,
  });

  return (
    <div className="bg-app h-screen flex flex-col p-4 justify-between pt-12">
      <div className="flex justify-between">
        <div onClick={reset}>
          <Icons.reset size={20} color="#FFFFFF" />
        </div>
        {/* <div onClick={() => { }}>
          <Icons.moreHorizontal size={20} color="#FFFFFF" />
        </div> */}
      </div>
      <div className="flex flex-row justify-between items-end pt-2">
        <div>
          <div className="text-ink-dull font-medium leading-5">{isBreak ? "Break" : "Focus"}</div>
          <div className="pt-4 pb-2 flex flex-row">
            {Array.from({ length: CYCLES }, (_, i) => (
              <div
                key={i}
                className={clsx("progress-item border-2 rounded-full w-3 h-3 mr-2",
                  cycle - 1 >= i && "half",
                  cycle - 1 >= i && isBreak && "done",
                  cycle - 1 >= i + 1 && "done",
                )}
              />
            ))}
          </div>
          <div className="text-5xl font-semibold text-ink leading-10 pt-4">{secondsToTime(timeLeft)}</div>
        </div>
        <div className="flex items-center">
          <div onClick={isPaused ? start : pause}>
            {isPaused ? <Icons.play size={24} color="#4AE485" fill="#4AE485" /> : <Icons.pause size={24} color="#4AE485" fill="#4AE485" />}
          </div>
        </div>
      </div>
      <Line
        percent={percentLeft}
        strokeColor={percentLeft === 0 ? "transparent" : "#4AE485"}
        trailColor="rgba(255,255,255,0.5)"
      />
    </div>
  );
};