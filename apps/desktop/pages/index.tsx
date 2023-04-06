"use client"

import {
  CYCLES,
  FOCUS_TIME,
  LONG_BREAK_TIME,
  SHORT_BREAK_TIME,
} from '@/constants';
import { useChronowise } from '@/hooks';
import { secondsToTime } from '@/utils';
import { Button, Icons } from '@chronowise/ui';
import clsx from 'clsx';
import { Line } from 'rc-progress';
import { useEffect, useState } from 'react';
export default function Home() {
  const [tauriWindow, setTauriWindow] = useState<any>();
  const [tauriInvoke, setTauriInvoke] = useState<any>();

  async function setupAppWindow() {
    const tauriWindow = (await import('@tauri-apps/api/window'));
    setTauriWindow({ appWindow: tauriWindow.appWindow, LogicalSize: tauriWindow.LogicalSize });
  }

  async function setupInvoke() {
    const tauriInvoke = (await import('@tauri-apps/api'));
    setTauriInvoke(tauriInvoke);
  }

  useEffect(() => {
    setupAppWindow();
    setupInvoke();
  }, [])

  useEffect(() => {
    tauriWindow && tauriWindow.appWindow.setSize(new tauriWindow.LogicalSize(300, 240));
  }, [tauriWindow])

  useEffect(() => {
    tauriInvoke && tauriInvoke.invoke('app_ready');
  }, [tauriInvoke]);

  const { cycle, isBreak, isPaused, timeLeft, percentLeft, start, pause, reset } = useChronowise({
    focusTime: FOCUS_TIME,
    shortBreakTime: SHORT_BREAK_TIME,
    longBreakTime: LONG_BREAK_TIME,
    cycles: CYCLES
  });

  return (
    <div className="flex h-screen flex-col justify-between p-4 pt-12">
      <div className="flex justify-between">
        <Button
          href="settings"
          variant="subtle"
          className="text-ink-faint ring-offset-sidebar"
        >
          <Icons.cog size={20} color="#FFFFFF" />
        </Button>
      </div>
      <div className="flex flex-row items-end justify-between pt-2">
        <div>
          <div className="text-ink-dull font-medium leading-5">
            {isBreak ? 'Break' : 'Focus'}
          </div>
          <div className="flex flex-row pb-2 pt-4">
            {Array.from({ length: CYCLES }, (_, i) => (
              <div
                key={i}
                className={clsx(
                  'progress-item mr-2 h-3 w-3 rounded-full border-2',
                  cycle - 1 >= i && 'half',
                  cycle - 1 >= i && isBreak && 'done',
                  cycle - 1 >= i + 1 && 'done'
                )}
              />
            ))}
          </div>
          <div className="text-ink pt-4 text-5xl font-semibold leading-10">
            {secondsToTime(timeLeft)}
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="subtle"
            className="text-ink-faint ring-offset-sidebar"
            onClick={reset}
          >
            <Icons.reset size={20} color="#FFFFFF" />
          </Button>
          <Button
            variant="subtle"
            className="text-ink-faint ring-offset-sidebar"
            onClick={isPaused ? start : pause}
          >
            {isPaused ? (
              <Icons.play size={24} color="#4AE485" fill="#4AE485" />
            ) : (
              <Icons.pause size={24} color="#4AE485" fill="#4AE485" />
            )}
          </Button>
        </div>
      </div>
      <Line
        percent={percentLeft}
        strokeColor={percentLeft === 0 ? 'transparent' : '#4AE485'}
        trailColor="rgba(255,255,255,0.5)"
      />
    </div>
  );
}
