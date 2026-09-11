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
      className="fixed w-30 rounded-md bg-white p-2 shadow-lg text-gray-700"
      style={{ left: x, top: y }}
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.stopPropagation()}
    >
      <button className="block hover:bg-gray-200 w-full pb-2 text-left" onClick={editWork}>
        Sửa
      </button>
      <button className="block hover:bg-gray-200 w-full pt-2 text-left" onClick={deleteWork}>
        Xoá
      </button>
    </div>
  );
}
