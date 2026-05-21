function PaymentTable({ members }) {
  const membersWithPayments = members?.filter(m => m.payments && m.payments.length > 0);

  if (!membersWithPayments?.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 text-center mt-6">
        <p className="text-gray-500 italic">No payment history available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 mt-6 overflow-hidden">
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="font-bold text-lg text-gray-800 dark:text-white">All Payments</h3>
      </div>

      <div className="hidden md:block">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50 dark:bg-gray-900/50 text-gray-500 uppercase text-[11px] tracking-widest">
              <th className="p-4">Member Name</th>
              <th className="p-4">Month</th>
              <th className="p-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {membersWithPayments.map((m) =>
              m.payments.map((p, i) => (
                <tr key={`${m._id}-${i}`} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-100">{m.name}</td>
                  <td className="p-4 text-gray-600 dark:text-gray-400">{p.month}</td>
                  <td className="p-4 text-right font-bold text-green-600">₹{p.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="md:hidden divide-y dark:divide-gray-700">
        {membersWithPayments.map((m) => (
          <div key={m._id} className="p-4">
            <h4 className="text-xs font-black uppercase tracking-tighter text-blue-600 mb-3">
              {m.name}
            </h4>
            <div className="space-y-2">
              {m.payments.map((p, i) => (
                <div key={i} className="flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {p.month}
                  </span>
                  <span className="text-sm font-bold text-green-600">
                    ₹{p.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentTable;