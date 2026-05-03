function Select({
  label,
  value,
  onChange,
  options = [],
  name,
}) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 border rounded-xl bg-white dark:bg-gray-800 dark:text-white"
      >
        {options.map((item) => (
          <option key={item.value || item} value={item.value || item}>
            {item.label || item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;