function PaymentHistory({ payments }) {
  if (!payments || payments.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="font-bold text-lg mb-2">Payment History</h3>
        <p className="text-gray-500 text-sm italic">No payments recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">Payment History</h3>

      {/* DESKTOP TABLE (md and up) */}
      <div className="hidden md:block">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-500 uppercase text-[11px] tracking-widest border-b dark:border-gray-700">
              <th className="pb-3 px-2">Month</th>
              <th className="pb-3 px-2">Amount</th>
              <th className="pb-3 px-2">Paid On</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {payments.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
                <td className="py-3 px-2 font-medium">{p.month}</td>
                <td className="py-3 px-2 text-green-600 font-semibold">₹{p.amount}</td>
                <td className="py-3 px-2 text-gray-500">
                  {p.paidOn ? new Date(p.paidOn).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }) : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE LIST (Visible below md) */}
      <div className="md:hidden space-y-3">
        {payments.map((p, i) => (
          <div 
            key={i} 
            className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-700"
          >
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{p.month}</p>
              <p className="text-[11px] text-gray-500 uppercase tracking-tighter">
                {p.paidOn ? new Date(p.paidOn).toLocaleDateString() : 'Date missing'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-green-600 font-bold">₹{p.amount}</p>
              <span className="text-[10px] bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full font-bold uppercase">
                Paid
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PaymentHistory;