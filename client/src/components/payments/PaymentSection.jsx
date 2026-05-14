import Input from "../ui/Input";

function PaymentSection({ payments, updatePayment, addPaymentRow, removePayment }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 space-y-6">
      
      <div className="flex flex-row justify-between items-center border-b dark:border-gray-700 pb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
          Payment History
        </h2>

        <button
          onClick={addPaymentRow}
          className="px-3 py-1.5 sm:px-4 sm:py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-colors shadow-sm"
        >
          + Add <span className="hidden xs:inline">Payment</span>
        </button>
      </div>

      <div className="space-y-4">
        {payments?.map((pay, index) => (
          <div 
            key={index} 
            className="relative grid grid-cols-2 md:grid-cols-4 gap-3 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700 md:bg-transparent md:p-0 md:border-0"
          >
            <div className="col-span-2 md:col-span-1">
              <Input
                label="Month"
                placeholder="e.g. January"
                value={pay.month}
                onChange={(e) => updatePayment(index, "month", e.target.value)}
              />
            </div>

            <div className="col-span-1 md:col-span-1">
              <Input
                label="Amount"
                type="number"
                placeholder="0.00"
                value={pay.amount}
                onChange={(e) => updatePayment(index, "amount", e.target.value)}
              />
            </div>

            <div className="col-span-1 md:col-span-1">
              <Input
                label="Paid On"
                type="date"
                value={pay.paidOn?.slice(0, 10)}
                onChange={(e) => updatePayment(index, "paidOn", e.target.value)}
              />
            </div>

            <div className="col-span-2 md:col-span-1 flex items-end">
              <button
                onClick={() => removePayment(index)}
                className="w-full md:w-auto px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-lg hover:bg-red-600 hover:text-white transition-all text-sm font-medium h-[42px] md:mb-[2px]"
              >
                Delete <span className="md:hidden text-xs opacity-75">(Entry {index + 1})</span>
              </button>
            </div>

          </div>
        ))}

        {!payments?.length && (
          <p className="text-center py-6 text-gray-500 dark:text-gray-400 italic text-sm">
            No payment records added yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default PaymentSection;