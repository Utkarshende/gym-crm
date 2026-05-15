import Member from "../models/Member.js";


// MARK PAYMENT
export const markPaid = async (req, res) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;

    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const member = await Member.findOne({
      _id: id,
      adminId: req.user.id,
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    member.payments.push({
      amount,
      month,
    });

    await member.save();

    res.json({
      message: "Payment added",
      member,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// PENDING MEMBERS
export const getPendingMembers = async (req, res) => {
  try {
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const members = await Member.find({
      adminId: req.user.id,
    });

    const pending = members.filter(
      (m) =>
        !m.payments.some(
          (p) => p.month === month
        )
    );

    res.json(pending);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// MONTHLY REVENUE
export const monthlyRevenue = async (req, res) => {
  try {
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const members = await Member.find({
      adminId: req.user.id,
    });

    let total = 0;

    members.forEach((m) => {
      m.payments.forEach((p) => {
        if (p.month === month) {
          total += p.amount;
        }
      });
    });

    res.json({
      revenue: total,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};