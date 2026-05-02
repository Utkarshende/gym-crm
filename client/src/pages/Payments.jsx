import { useEffect,useState } from "react";
import API from "../services/api";

function Payments(){

const [pending,setPending] = useState([]);
const [revenue,setRevenue] = useState(0);

const fetchData = async()=>{

const p = await API.get("/payments/pending/list");
const r = await API.get("/payments/revenue/month");

setPending(p.data);
setRevenue(r.data.revenue);
};

useEffect(()=>{
fetchData();
},[]);

const markPaid = async(id,fee)=>{
await API.post(`/payments/${id}/pay`,{
amount:fee
});

fetchData();
};

return(
<div className="p-6">

<h1 className="text-3xl font-bold mb-6">
Payments Dashboard
</h1>

<div className="bg-green-600 text-white p-4 rounded mb-6">
Revenue This Month: ₹{revenue}
</div>

<h2 className="text-xl font-semibold mb-4">
Pending Members
</h2>

<table className="w-full bg-white rounded shadow">
<thead>
<tr className="bg-gray-100">
<th>Name</th>
<th>Fee</th>
<th>Action</th>
</tr>
</thead>

<tbody>
{pending.map((m)=>(
<tr key={m._id} className="border-b">

<td className="p-3">{m.name}</td>
<td>₹{m.fee}</td>

<td>
<button
onClick={()=>markPaid(m._id,m.fee)}
className="bg-blue-600 text-white px-3 py-1 rounded"
>
Mark Paid
</button>
</td>

</tr>
))}
</tbody>
</table>

</div>
);
}

export default Payments;