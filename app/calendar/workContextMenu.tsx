type ContextMenuProps = {
  x: number;
  y: number;
  isOpen: boolean;
  editWork: () => void;
  deleteWork: () => void;
};

export default function WorkContextMenu({
  x,
  y,
  isOpen,
  editWork,
  deleteWork,
}: ContextMenuProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed min-w-36 rounded-md border border-slate-200 bg-white py-1 shadow-lg text-gray-700"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <button className="block" onClick={editWork}>
        Sửa
      </button>
      <button className="block" onClick={deleteWork}>
        Xoá
      </button>
    </div>
  );
}
