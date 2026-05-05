import Input from "../ui/Input";

function PaymentSection({ payments, updatePayment, addPaymentRow, removePayment }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow space-y-4">
      
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Payment History</h2>

        <button
          onClick={addPaymentRow}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          + Add Payment
        </button>
      </div>

      {payments?.map((pay, index) => (
        <div key={index} className="grid md:grid-cols-4 gap-3">
          
          <Input
            label="Month"
            value={pay.month}
            onChange={(e) =>
              updatePayment(index, "month", e.target.value)
            }
          />

          <Input
            label="Amount"
            type="number"
            value={pay.amount}
            onChange={(e) =>
              updatePayment(index, "amount", e.target.value)
            }
          />

          <Input
            label="Paid On"
            type="date"
            value={pay.paidOn?.slice(0, 10)}
            onChange={(e) =>
              updatePayment(index, "paidOn", e.target.value)
            }
          />

          <button
            onClick={() => removePayment(index)}
            className="mt-7 px-3 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>

        </div>
      ))}
    </div>
  );
}

export default PaymentSection;