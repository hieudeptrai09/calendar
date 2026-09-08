import { Fragment, useRef, useState } from "react";
import WorkDialog from "./workDialog";
import { LIMIT, MINUTE_PER_DAY } from "./constant";

type ScreenPosition = {
  x: number;
  y: number;
};

export default function WorkGrid() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const dragDate = useRef("");
  const dropDate = useRef("");

  const toDate = (screenX: number, screenY: number) => {
    if (!boxRef.current) return new Date().toISOString().slice(0, 16);
    const rect = boxRef.current.getBoundingClientRect();
    console.log(rect);
    const dateOffset = ((screenX - rect.left) * LIMIT) / rect.width - LIMIT + 1;
    const minuteFromMidnight =
      ((screenY - rect.top) * MINUTE_PER_DAY) / rect.height;
    const date = new Date();
    date.setDate(date.getDate() + dateOffset);
    date.setHours(0, minuteFromMidnight, 0, 0);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    dragDate.current = toDate(event.clientX, event.clientY);
    console.log("Drag date", dragDate.current);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropDate.current = toDate(event.clientX, event.clientY);
    console.log("Drop date", dropDate.current);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div
        ref={boxRef}
        className="grid grid-cols-7 grid-rows-24 border border-gray-300 absolute inset-0"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {Array.from({ length: 24 }).map((_, rowIndex) => (
          <Fragment key={rowIndex}>
            {Array.from({ length: 7 }).map((_, colIndex) => (
              <div key={colIndex} className="border border-gray-300">
                {/* Content for each cell */}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <WorkDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title="Create Event"
        isReadonly={false}
      />
    </>
  );
}
