function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl w-[95%] md:w-[500px]">
        <div className="flex justify-between mb-4">
          <h2 className="font-bold text-xl">{title}</h2>

          <button onClick={onClose}>✕</button>
        </div>

        {children}
      </div>
    </div>
  );
}

export default Modal;