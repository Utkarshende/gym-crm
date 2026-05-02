import Member from "../models/Member.js";

export const markPaid = async (req,res) => {
try{

const { amount } = req.body;
const { id } = req.params;

const month = new Date().toLocaleString("default", {
month:"long",
year:"numeric"
});

const member = await Member.findById(id);

member.payments.push({
amount,
month
});

await member.save();

res.json({
message:"Payment Added",
member
});

}catch(error){
res.status(500).json({message:error.message});
}
};

export const getPendingMembers = async (req,res) => {
try{

const month = new Date().toLocaleString("default", {
month:"long",
year:"numeric"
});

const members = await Member.find();

const pending = members.filter((m)=>
!m.payments.some((p)=>p.month === month)
);

res.json(pending);

}catch(error){
res.status(500).json({message:error.message});
}
};

export const monthlyRevenue = async (req,res) => {
try{

const month = new Date().toLocaleString("default", {
month:"long",
year:"numeric"
});

const members = await Member.find();

let total = 0;

members.forEach((m)=>{
m.payments.forEach((p)=>{
if(p.month === month){
total += p.amount;
}
});
});

res.json({ revenue: total });

}catch(error){
res.status(500).json({message:error.message});
}
};