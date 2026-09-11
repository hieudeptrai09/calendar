import { useEffect, useMemo, useState, type RefObject } from "react";
import WorkDialog from "./workDialog";
import WorkContextMenu from "./workContextMenu";
import { coordinateToDate, workToRects } from "./utils";
import { DRAG_TIME, DRAG_ID } from "./constant";
import { useWorkContext } from "./workContext";
import NotificationDialog from "./notificationDialog";

export default function WorkSection({
  workId,
  boxRef,
}: {
  workId: string;
  boxRef: RefObject<HTMLDivElement | null>;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [xContextMenu, setXContextMenu] = useState(0);
  const [yContextMenu, setYContextMenu] = useState(0);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [resizeTick, setResizeTick] = useState(0);

  const { works, moveWork, removeWork } = useWorkContext();
  const work = works[workId];

  const workPositions = useMemo(() => {
    if (!work || !boxRef.current) return [];
    return workToRects(work, boxRef.current.getBoundingClientRect());
  }, [work, boxRef.current, resizeTick]);

  useEffect(() => {
    const notifyResize = () => setResizeTick((prev) => prev + 1);
    window.addEventListener("resize", notifyResize);
    return window.removeEventListener("resize", notifyResize);
  }, []);

  useEffect(() => {
    if (!isContextMenuOpen) return;
    const close = () => setIsContextMenuOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("click", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [isContextMenuOpen]);

  if (!work || workPositions.length === 0) return null;

  const handleDragStart = (event: React.DragEvent) => {
    event.stopPropagation();
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(DRAG_ID, workId);
    event.dataTransfer.setData(
      DRAG_TIME,
      coordinateToDate(
        event.clientX,
        event.clientY,
        boxRef.current?.getBoundingClientRect(),
      ),
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
      coordinateToDate(
        event.clientX,
        event.clientY,
        boxRef.current?.getBoundingClientRect(),
      ),
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
    setIsNotifyOpen(true);
  };

  return (
    <>
      {workPositions.map((workPosition) => (
        <div
          key={`${workPosition.left}-${workPosition.top}`}
          className="absolute bg-yellow-700 overflow-hidden px-3 py-2 hover:bg-yellow-800"
          draggable
          onClick={(e) => handleMoveDown(e)}
          onContextMenu={(e) => handleShowContextMenu(e)}
          onDragStart={(e) => handleDragStart(e)}
          onDragOver={(e) => handleDragOver(e)}
          onDrop={(e) => handleDrop(e)}
          style={{ ...workPosition }}
        >
          <div className="text-xl font-bold">{work.name}</div>
          <div>{work.description}</div>
        </div>
      ))}
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
      <NotificationDialog
        isOpen={isNotifyOpen}
        onClose={() => setIsNotifyOpen(false)}
        workId={workId}
      />
    </>
  );
}
