function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
}) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
}

export default Input;