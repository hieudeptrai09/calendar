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
    >
      <button onClick={editWork}>Sửa</button>
      <button onClick={deleteWork}>Xoá</button>
    </div>
  );
}
