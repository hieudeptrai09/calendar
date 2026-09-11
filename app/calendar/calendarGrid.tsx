import { useRef } from "react";
import { LIMIT } from "./constant";
import WorkGrid from "./workGrid";
import WorkSection from "./workSection";

export default function CalendarGrid({ works }: { works: string[] }) {
  const dates = [];
  const times = [];
  const boxRef = useRef<HTMLDivElement>(null);

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
        <div className="w-15 min-w-15 h-12 border border-gray-300"></div>
        {dates.map((date) => (
          <div
            key={date}
            className="h-12 border-t border-r border-b border-gray-300 flex flex-1 min-w-0 items-center justify-center"
          >
            <span className="truncate px-1">{date}</span>
          </div>
        ))}
      </div>
      <div className="flex w-full">
        <div className="flex flex-col w-15">
          {times.map((time) => (
            <div
              key={time}
              className="h-[100px] border-l border-r border-b border-gray-300 flex items-start justify-center"
            >
              {time}
            </div>
          ))}
        </div>

        <div className="relative flex-1">
          <div className="absolute inset-0" ref={boxRef}>
            <WorkGrid boxRef={boxRef} />
            {works.map((workId) => (
              <WorkSection key={workId} workId={workId} boxRef={boxRef} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
