import Member from "../models/Member.js";

// ✅ Mark Payment
export const markPaid = async (req, res) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;

    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const member = await Member.findById(id);

    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }

    // Prevent duplicate payment for same month
    const alreadyPaid = member.payments.some(
      (p) => p.month === month
    );

    if (alreadyPaid) {
      return res.status(400).json({ message: "Already paid this month" });
    }

    member.payments.push({
      amount: Number(amount),
      month,
      paidOn: new Date(),
    });

    await member.save();

    res.json({
      message: "Payment Added ✅",
      member,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Pending Members
export const getPendingMembers = async (req, res) => {
  try {
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const members = await Member.find();

    const pending = members.filter(
      (m) =>
        !m.payments?.some((p) => p.month === month)
    );

    res.json(pending);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Monthly Revenue
export const monthlyRevenue = async (req, res) => {
  try {
    const month = new Date().toLocaleString("default", {
      month: "long",
      year: "numeric",
    });

    const members = await Member.find();

    let total = 0;

    members.forEach((m) => {
      m.payments?.forEach((p) => {
        if (p.month === month) {
          total += Number(p.amount || 0);
        }
      });
    });

    res.json({ revenue: total });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};