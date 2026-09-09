import { useEffect, useRef, useState } from "react";
import { LIMIT } from "./constant";
import WorkGrid from "./workGrid";
import WorkSection from "./workSection";
import type { boundingClientRect } from "./type";

export default function CalendarGrid({ works }: { works: string[] }) {
  const dates = [];
  const times = [];
  const boxRef = useRef<HTMLDivElement>(null);
  const [boxRect, setBoxRect] = useState<boundingClientRect | undefined>(
    undefined,
  );

  useEffect(() => {
    if (boxRef.current) setBoxRect(boxRef.current.getBoundingClientRect());
  }, []);

  for (let i = 0; i < LIMIT; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    dates.push(date.toLocaleDateString("en-UK"));
  }

  for (let i = 0; i < 24; i++) {
    times.push(`${i.toString().padStart(2, "0")}:00`);
  }

  return (
    <>
      <div className="flex w-full">
        <div className="w-15 h-12 border border-gray-300"></div>
        {dates.map((date, index) => (
          <div
            key={index}
            className="h-12 border border-gray-300 flex flex-1 items-center justify-center"
          >
            {date}
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <div className="flex flex-col w-15">
          {times.map((time, index) => (
            <div
              key={index}
              className="h-[100px] border border-gray-300 flex items-start justify-center"
            >
              {time}
            </div>
          ))}
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-0" ref={boxRef}>
            <WorkGrid boxRect={boxRect} />
            {works.map((workId) => (
              <WorkSection workId={workId} boxRect={boxRect} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
