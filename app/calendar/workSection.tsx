import { useMemo, useRef, useState } from "react";
import WorkDialog from "./workDialog";
import WorkContextMenu from "./workContextMenu";
import type { boundingClientRect, WorkInner } from "./type";
import { coordinateToDate, dateToCoordinate, validate } from "./utils";
import { LIMIT } from "./constant";
import { useWorkContext } from "./workContext";

export default function WorkSection({
  workId,
  boxRect,
}: {
  workId: string;
  boxRect?: boundingClientRect;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [xContextMenu, setXContextMenu] = useState(0);
  const [yContextMenu, setYContextMenu] = useState(0);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  const dragDateRef = useRef("");

  const { works, saveWork, removeWork } = useWorkContext();
  const work = works[workId];

  const workPosition = useMemo(() => {
    if (!work || !boxRect) return null;
    const startPosition = dateToCoordinate(work.startTime, boxRect);
    const endPosition = dateToCoordinate(work.endTime, boxRect);
    return {
      top: startPosition.top,
      left: startPosition.left,
      width: boxRect.width / LIMIT,
      height: endPosition.top - startPosition.top,
    };
  }, [work, boxRect]);

  if (!work || !workPosition) return null;

  const handleDragStart = (event: React.MouseEvent) => {
    dragDateRef.current = coordinateToDate(
      event.clientX,
      event.clientY,
      boxRect,
    );
  };

  const handleDragOver = (event: React.MouseEvent) => {
    event.stopPropagation();
    event.preventDefault();
  };

  const handleDrop = (event: React.MouseEvent) => {
    event.preventDefault();
    const dropDate = coordinateToDate(event.clientX, event.clientY, boxRect);
    const startTimeOffset = Math.abs(
      new Date(work.startTime).getTime() -
        new Date(dragDateRef.current).getTime(),
    );
    const endTimeOffset = Math.abs(
      new Date(work.endTime).getTime() -
        new Date(dragDateRef.current).getTime(),
    );
    let newWork: WorkInner = {
      name: "",
      description: "",
      startTime: "",
      endTime: "",
    };
    if (startTimeOffset < endTimeOffset)
      newWork = { ...work, startTime: dropDate };
    else newWork = { ...work, endTime: dropDate };
    const result = validate(newWork, works, workId);
    if (result.ok) saveWork(workId, newWork);
  };

  const handleMoveDown = (event: React.MouseEvent) => {
    if (event.button === 0) {
      setIsDialogOpen(true);
      setIsReadOnly(true);
      setDialogTitle("View event");
    }
  };

  const handleShowContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    setXContextMenu(event.clientX);
    setYContextMenu(event.clientY);
    setIsContextMenuOpen(true);
  };

  const editWork = () => {
    setIsContextMenuOpen(false);
    setIsDialogOpen(true);
    setIsReadOnly(false);
    setDialogTitle("Edit event");
  };

  const deleteWork = () => {
    setIsContextMenuOpen(false);
    removeWork(workId);
  };

  return (
    <div
      className="absolute top-0 left-0 bg-yellow-500 w-20 h-20"
      onClick={(e) => handleMoveDown(e)}
      onContextMenu={(e) => handleShowContextMenu(e)}
      onDragStart={(e) => handleDragStart(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDrop={(e) => handleDrop(e)}
      style={{ ...workPosition }}
    >
      <div>{work.name}</div>
      <div>{work.description}</div>
      <WorkDialog
        work={work}
        workId={workId}
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={dialogTitle}
        isReadonly={isReadOnly}
      />
      <WorkContextMenu
        x={xContextMenu}
        y={yContextMenu}
        isOpen={isContextMenuOpen}
        editWork={editWork}
        deleteWork={deleteWork}
      />
    </div>
  );
}
