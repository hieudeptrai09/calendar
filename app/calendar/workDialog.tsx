type WorkDialogProps = {
  work?: Work;
  isOpen: boolean;
  onClose: () => void;
};

export default function WorkDialog({ work, isOpen, onClose }: WorkDialogProps) {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.currentTarget));
    const key = Math.floor(Math.random() * 1000000000).toString(36);
    localStorage.setItem(`workData_${key}`, JSON.stringify(formData));
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-1"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg w-[500px] max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 border-b border-gray-300 pb-2">
          <h2 className="text-xl font-bold text-gray-700 text-center">
            Input Work
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold focus:outline-none"
          >
            ×
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="border border-gray-300 rounded py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 w-full"
              placeholder="Enter work name"
            />
          </div>
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              className="border border-gray-300 rounded py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700 w-full"
              placeholder="Enter work description"
            />
          </div>
          <div>
            <label className="block text-gray-700">Start Time</label>
            <input
              type="datetime-local"
              className="border border-gray-300 rounded py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>
          <div>
            <label className="block text-gray-700">End Time</label>
            <input
              type="datetime-local"
              className="border border-gray-300 rounded py-2 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-700 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Work
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
