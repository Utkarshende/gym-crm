function Badge({ status }) {
  const colors = {
    active: "bg-green-100 text-green-700",
    paused: "bg-yellow-100 text-yellow-700",
    expired: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[status]}`}>
      {status}
    </span>
  );
}

export default Badge;