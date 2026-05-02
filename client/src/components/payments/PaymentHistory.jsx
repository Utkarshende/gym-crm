function PaymentHistory({ payments }) {
  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-2">Payment History</h3>
        <p>No payments yet</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-4">Payment History</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Month</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Paid On</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p, i) => (
            <tr key={i} className="border-b">
              <td className="p-2">{p.month}</td>
              <td className="p-2">₹{p.amount}</td>
              <td className="p-2">
                {new Date(p.paidOn).toDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentHistory;