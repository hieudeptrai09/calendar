import { Fragment, useRef, useState } from "react";
import WorkDialog from "./workDialog";
import type { boundingClientRect } from "./type";
import { coordinateToDate } from "./utils";

export default function WorkGrid({
  boxRect,
}: {
  boxRect?: boundingClientRect;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [work, setWork] = useState<WorkInner>({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
  });

  const dragDate = useRef("");
  const dropDate = useRef("");

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    dragDate.current = coordinateToDate(event.clientX, event.clientY, boxRect);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropDate.current = coordinateToDate(event.clientX, event.clientY, boxRect);
    setWork((prevWork) => ({
      ...prevWork,
      startTime: dragDate.current,
      endTime: dropDate.current,
    }));
    setIsDialogOpen(true);
  };

  return (
    <>
      <div
        className="grid grid-cols-7 grid-rows-24 border border-gray-300 w-full h-full"
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
        work={work}
      />
    </>
  );
}
