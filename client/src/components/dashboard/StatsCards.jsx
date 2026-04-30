function StatsCards({ members }) {
  const total = members.length;
  const active = members.filter((m) => m.status === "active").length;
  const paused = members.filter((m) => m.status === "paused").length;
  const expired = members.filter((m) => m.status === "expired").length;

  const cards = [
    { title: "Total Members", value: total },
    { title: "Active", value: active },
    { title: "Paused", value: paused },
    { title: "Expired", value: expired },
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white shadow rounded-xl p-5"
        >
          <h3 className="text-gray-500">{card.title}</h3>
          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export default StatsCards;