import { Fragment, useRef, useState, type RefObject } from "react";
import WorkDialog from "./workDialog";
import type { WorkInner } from "./type";
import { coordinateToDate } from "./utils";
import { DRAG_TIME, DRAG_ID } from "./constant";
import { useWorkContext } from "./workContext";

export default function WorkGrid({
  boxRef,
}: {
  boxRef: RefObject<HTMLDivElement | null>;
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

  const { moveWork } = useWorkContext();

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    dragDate.current = coordinateToDate(
      event.clientX,
      event.clientY,
      boxRef.current?.getBoundingClientRect(),
    );
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropDate.current = coordinateToDate(
      event.clientX,
      event.clientY,
      boxRef.current?.getBoundingClientRect(),
    );
    const draggedWorkId = event.dataTransfer.getData(DRAG_ID);
    const grabTime = event.dataTransfer.getData(DRAG_TIME);
    if (draggedWorkId && grabTime) {
      moveWork(draggedWorkId, grabTime, dropDate.current);
      return;
    }
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
        className="grid grid-cols-7 grid-rows-24 w-full h-full"
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {Array.from({ length: 24 }).map((_, rowIndex) => (
          <Fragment key={rowIndex}>
            {Array.from({ length: 7 }).map((_, colIndex) => (
              <div key={colIndex} className="border-r border-b border-gray-300 hover:bg-gray-200 dark:hover:bg-gray-900">
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
