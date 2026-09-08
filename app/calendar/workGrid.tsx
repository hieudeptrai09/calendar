import { Fragment, useRef, useState } from "react";
import WorkDialog from "./workDialog";

type ScreenPosition = {
  x: number;
  y: number;
};

export default function WorkGrid() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const boxRef = useRef<HTMLDivElement>(null);
  const dragPosition = useRef<ScreenPosition>({ x: 0, y: 0 });
  const dropPosition = useRef<ScreenPosition>({ x: 0, y: 0 });

  const toLocalCoordinates = (screenX: number, screenY: number) => {
    if (!boxRef.current) return { x: 0, y: 0 };
    const rect = boxRef.current.getBoundingClientRect();
    return {
      x: screenX - rect.left,
      y: screenY - rect.top,
    };
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    dragPosition.current = toLocalCoordinates(event.clientX, event.clientY);
    console.log("Drag at:", dragPosition.current.x, dragPosition.current.y);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dropPosition.current = toLocalCoordinates(event.clientX, event.clientY);
    console.log("Dropped at:", dropPosition.current.x, dropPosition.current.y);
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
      />
    </>
  );
}
