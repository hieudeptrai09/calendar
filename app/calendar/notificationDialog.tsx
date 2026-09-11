import { useWorkContext } from "./workContext";

type NotificationDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  workId: string;
};

export default function NotificationDialog({
  isOpen,
  onClose,
  workId,
}: NotificationDialogProps) {
  const { works, removeWork } = useWorkContext();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-1"
      onClick={onClose}
    >
      <div
        className="bg-white p-10 rounded shadow-lg w-[400px] max-w-full"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="text-lg text-center text-gray-700 pb-4">
          Do you want to delete the work "{works[workId].name}"
        </div>

        <div className="flex justify-center space-x-2 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => removeWork(workId)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
