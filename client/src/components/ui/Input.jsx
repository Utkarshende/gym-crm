function Input({ label, type = "text", name, value, onChange }) {
  return (
    <div>
      <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-700 dark:text-white"
      />
    </div>
  );
}

export default Input;