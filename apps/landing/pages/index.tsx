"use client";

import { RootLayout } from "@/components"
import { getDownloadLink, getOs } from "@/utils"

import { Button, Icons } from "@chronowise/ui"
import { useTheme } from "next-themes"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"

import {version} from '@chronowise/desktop/package.json'

import coffeeMan from '/public/coffee-man.svg'
import coffeeManDark from '/public/coffee-man-dark.svg'
import appInterface from '/public/app-interface-shadow.png'
import womanOnLaptop from '/public/woman-on-laptop.png'
import womanOnLaptopDark from '/public/woman-on-laptop-dark.png'

export default function Home() {
  const {resolvedTheme} = useTheme();

  const [currentOs, setCurrentOs] = useState<"Mac" | "Windows" | "Linux" | null>(null);
  const [images, setImages] = useState<any>(null);

  const getImage = (imageName: string) => {
    return images?.[imageName] || null;
  }

  const coffeeManImage = getImage(resolvedTheme === "dark" ? "coffeeManDark" : "coffeeMan");
  const womanOnLaptopImage = getImage(resolvedTheme === "dark" ? "womanOnLaptopDark" : "womanOnLaptop");

  const osIcon = useMemo(() => {
    const iconProps = {className: "h-6 w-6 mr-2 mb-[2px] fill-current"};

    if (currentOs === "Mac") {
      return <Icons.apple {...iconProps} />
    } else if (currentOs === "Windows") {
      return <Icons.windows {...iconProps} />
    } else if (currentOs === "Linux") {
      return <Icons.linux {...iconProps} />
    }
  }, [currentOs]);

  const updateCurrentOs = () => {
    const os = getOs();

    if (os !== "iOS" && os !== "Android") {
      setCurrentOs(os);
    }
  };

  const handleDownloadClick = () => {
    if (!currentOs) return;

    const link = getDownloadLink(currentOs);
    window.open(link, "_blank");
  };

  useEffect(() => {
    setImages(
      {
        coffeeMan,
        coffeeManDark,
        appInterface,
        womanOnLaptop,
        womanOnLaptopDark,
      }
    )
  }, [resolvedTheme])

  useEffect(() => {
    updateCurrentOs();
  }, []);
  
  return (
    <>
      <RootLayout>
        <div className="flex w-full flex-col items-center mb-16 2xl:mt-32 xl:mt-28 lg:mt-20 md:mt-18 sm:mt-20 mt-16">
          {!!coffeeManImage && <Image
            src={coffeeManImage}
            className="animation-delay-2 fade-in mb-6 px-4"
            alt="coffee man"
            width="300"
            height="231"
          />}
          <div className="mx-auto flex flex-col items-center gap-4 px-4 2xl:mb-40 xl:mb-28 lg:mb-20 md:mb-18 sm:mb-20 mb-16">
            <h1 className="fade-in-heading z-30 text-center text-black dark:text-white text-3xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-6xl">
              A better way to improve your workflow
            </h1>
            <p className="animation-delay-1 fade-in leading-normal text-gray-500 dark:text-gray-200 sm:text-xl sm:leading-8 text-center">
              Chronowise is a blazingly fast, tiny focus timer.
              <br />
              It lets you increase productivity, reduce stress and much more.
            </p>
            {currentOs && (
              <>
                <Button
                  onClick={handleDownloadClick}
                  variant="default"
                  className="animation-delay-2 fade-in text-base focus:ring-0 align-bottom shadow-xl shadow-gray-400/50 dark:shadow-none mt-8"
                  size="lg"
                >
                  {osIcon}
                  <span className="text-[0px] leading-none">
                    <span className="font-bold text-xl leading-none">
                      Download for {currentOs}
                    </span>
                  </span>
                </Button>
                <div className="animation-delay-2 fade-in text-gray-400">
                  {currentOs === "Mac" && `v${version} | macOS 11+`}
                  {currentOs === "Windows" && `v${version} | Windows 10+`}
                  {currentOs === "Linux" && `v${version} | Linux`}
                </div>
              </>
            )}
          </div>
          <Image
            src={appInterface}
            className="animation-delay-2 fade-in -mb-40"
            alt="application interface"
            width="365"
            height="283"
          />
          <hr className="border-t border-t-gray-150 dark:border-t-gray-550 w-full" />
          <section className="fade-in-down container grid justify-center gap-6 pt-48 pb-24">
            <div className="mx-auto flex flex-col gap-4 md:max-w-[56rem] items-center">
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-6xl text-center">
                A simple and snappy focus timer
              </h2>
              <p className="leading-normal text-gray-500 dark:text-gray-200 sm:text-lg sm:leading-7 text-center">
                Chronowise is a new cross-platform focus timer experience built on Next.js and written from 
                <br />
                the ground up with performance in mind.
              </p>
            </div>
            <div className="grid justify-center gap-4 sm:grid-cols-2 md:max-w-[72rem] md:grid-cols-3">
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">Improving concentration</h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      Working in short intervals with breaks helps you keep your focus and concentrate on the task at hand.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">Stress management</h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      Regular breaks allow you to relax and reduce the stress level associated with the task.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">
                      Better time management
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      The technique helps you evaluate the time spent on a task, which can improve your productivity.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">
                      Interrupting Procrastination
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      The pomodoro technique helps overcome procrastination by providing a focus on the task for a short period of time.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">
                      Improved work discipline
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      Consistently completing tasks within a set time frame builds good work habits and improves self-organization.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">
                      Maintaining motivation
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      The pomodoro technique allows you to see your progress and successful completion of tasks, which helps to maintain motivation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto flex flex-col gap-4 md:max-w-[56rem]">
              <p className="leading-normal text-gray-500 dark:text-gray-200 sm:text-lg sm:leading-7 text-center">
                Chronowise is available on a range of platforms, view our downloads page
                <br/>
                to find out if your device is supported!
              </p>
            </div>
          </section>
          <hr className="border-t border-t-gray-150 dark:border-t-gray-550 w-full" />
          <section className="fade-in-down container grid justify-center gap-6 pt-24">
            <div className="mx-auto flex flex-col gap-4 md:max-w-[56rem] items-center">
              <h2 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:text-6xl text-center">
                All the features you need
              </h2>
              <p className="leading-normal text-gray-500 dark:text-gray-200 sm:text-lg sm:leading-7 text-center">
                Chronowise is a new cross-platform focus timer experience built on Next.js and written from 
                <br />
                the ground up with performance in mind.
              </p>
            </div>
            <div className="grid justify-center gap-4 sm:grid-cols-2 md:max-w-[72rem] md:grid-cols-3">
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">Simple design</h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      Chronowise comes with a minimal, easy-to-use and beautiful interface.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">Optimized & Powerful</h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      Built with the latest technologies and best practices.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">Lightweight</h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      Chronowise is always at your disposal without the need of a dock icon.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">
                      Built for your keyboard
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      Chronowise is built with keyboard shortcuts in mind.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">
                      Open Source
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                      Chronowise is open source
                      <br />
                      and free to use.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden">
                <div className="flex h-[320px] flex-col p-6 text-gray-850 items-center">
                  {!!womanOnLaptopImage && 
                    <Image
                      src={womanOnLaptopImage}
                      className="animation-delay-2 fade-in mb-6 px-4"
                      alt="woman on laptop"
                      width="200"
                      height="161"
                    />
                  }
                  <div className="space-y-2 text-center">
                    <h3 className="font-bold text-gray-500 dark:text-gray-200 text-lg">
                    And Much More!
                    </h3>
                    <p className="text-base text-gray-500 dark:text-gray-200">
                    {"Chronowise is a work in progress. We're adding new features all the time."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto flex flex-col gap-4 md:max-w-[56rem]">
              <p className="leading-normal text-gray-500 dark:text-gray-200 sm:text-lg sm:leading-7 text-center">
                Chronowise is available on a range of platforms, view our downloads page
                <br/>
                to find out if your device is supported!
              </p>
            </div>
          </section>
        </div>
      </RootLayout>
    </>
  );
}