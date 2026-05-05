function PaymentCard({ title, value, color }) {
  return (
    <div className={`${color} text-white p-5 rounded-xl shadow`}>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-2xl font-bold">{value}</h2>
    </div>
  );
}

export default PaymentCard;