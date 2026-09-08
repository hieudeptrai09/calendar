import { LIMIT } from "./constant";
import WorkGrid from "./workGrid";

export default function CalendarGrid() {
  const dates = [];
  const times = [];

  for (let i = LIMIT - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString());
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
          <WorkGrid />
        </div>
      </div>
    </>
  );
}
