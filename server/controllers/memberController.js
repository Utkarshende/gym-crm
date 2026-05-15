import Member from "../models/Member.js";


// GET MEMBERS
export const getMembers = async (req, res) => {
  try {

    const members = await Member.find({
      adminId: req.user._id,
    });

    res.json(members);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// ADD MEMBER
export const addMember = async (req, res) => {
  try {

    const member = await Member.create({
      ...req.body,
      adminId: req.user._id,
    });

    res.status(201).json(member);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// GET MEMBER BY ID
export const getMemberById = async (req, res) => {
  try {

    const member = await Member.findOne({
      _id: req.params._id,
      adminId: req.user._id,
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.json(member);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE MEMBER
export const updateMember = async (req, res) => {
  try {

    const member = await Member.findOneAndUpdate(
      {
        _id: req.params._id,
        adminId: req.user._id,
      },
      req.body,
      {
        new: true,
      }
    );

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.json(member);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE MEMBER
export const deleteMember = async (req, res) => {
  try {

    const member = await Member.findOneAndDelete({
      _id: req.params._id,
      adminId: req.user._id,
    });

    if (!member) {
      return res.status(404).json({
        message: "Member not found",
      });
    }

    res.json({
      message: "Member deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};