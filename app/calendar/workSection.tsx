import { useEffect, useRef, useState } from "react";
import WorkDialog from "./workDialog";
import WorkContextMenu from "./workContextMenu";

type ScreenPosition = {
  x: number;
  y: number;
};

export default function WorkSection({ workId }: { workId: string }) {
  const [work, setWork] = useState<WorkInner>({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);
  const [xContextMenu, setXContextMenu] = useState(0);
  const [yContextMenu, setYContextMenu] = useState(0);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");

  useEffect(() => {
    const work = JSON.parse(localStorage.getItem(workId) || "");
    setWork(work);
  }, []);

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
    setIsDialogOpen(true);
    setIsReadOnly(false);
    setDialogTitle("Edit event");
  };

  const deleteWork = () => {
    localStorage.removeItem(workId);
  };

  return (
    <div
      className="absolute top-0 left-0 bg-yellow-500 w-20 h-20"
      onMouseDown={(e) => handleMoveDown(e)}
      onContextMenu={(e) => handleShowContextMenu(e)}
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
