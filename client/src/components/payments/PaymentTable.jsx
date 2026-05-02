function PaymentTable({ members }) {
  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h3 className="font-semibold mb-4">All Payments</h3>

      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Name</th>
            <th className="p-2">Month</th>
            <th className="p-2">Amount</th>
          </tr>
        </thead>

        <tbody>
          {members.map((m) =>
            m.payments.map((p, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">{m.name}</td>
                <td className="p-2">{p.month}</td>
                <td className="p-2">₹{p.amount}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PaymentTable;