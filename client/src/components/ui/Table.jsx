function Table({ headers = [], children }) {
  return (
    <div className="overflow-auto bg-white dark:bg-gray-800 rounded-2xl shadow">
      <table className="w-full">
        <thead>
          <tr className="border-b dark:border-gray-700">
            {headers.map((item) => (
              <th key={item} className="text-left px-4 py-3">
                {item}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export default Table;