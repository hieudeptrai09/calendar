import { useMemo, useState } from "react";
import WorkDialog from "./workDialog";
import WorkContextMenu from "./workContextMenu";
import type { boundingClientRect } from "./type";
import { coordinateToDate, dateToCoordinate } from "./utils";
import { DRAG_TIME, DRAG_ID, LIMIT } from "./constant";
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

  const { works, moveWork, removeWork } = useWorkContext();
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

  const handleDragStart = (event: React.DragEvent) => {
    event.stopPropagation();
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(DRAG_ID, workId);
    event.dataTransfer.setData(
      DRAG_TIME,
      coordinateToDate(event.clientX, event.clientY, boxRect),
    );
  };

  const handleDragOver = (event: React.DragEvent) => {
    if (!event.dataTransfer.types.includes(DRAG_ID)) return;
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (event: React.DragEvent) => {
    const draggedWorkId = event.dataTransfer.getData(DRAG_ID);
    const grabTime = event.dataTransfer.getData(DRAG_TIME);
    if (!draggedWorkId || !grabTime) return;
    event.stopPropagation();
    event.preventDefault();
    moveWork(
      draggedWorkId,
      grabTime,
      coordinateToDate(event.clientX, event.clientY, boxRect),
    );
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
      draggable
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
