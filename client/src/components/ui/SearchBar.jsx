function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={onChange}
      className="px-4 py-2 border rounded-xl w-full md:w-72 dark:bg-gray-800 dark:text-white"
    />
  );
}

export default SearchBar;