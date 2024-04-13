const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  try {
    //find user
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash password
    const hashPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    //token
    const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
      expiresIn: "24hrs",
    });

    //response
    res.status(200).json({
      status: "Success",
      message: "User created successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    //unhash password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    //check if password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //token
    const token = jwt.sign({ _id: user._id }, "secretkey123", {
      expiresIn: "24hrs",
    });

    //response
    res.status(200).json({
      status: "Success",
      message: "Logged in successfully",
      token,
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    //find user and delete
    const user = await User.findByIdANdDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      status: "Success",
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const searchBy = {};
    if (search) {
      searchBy.first_name = search;
    }
    const user = await User.find(searchBy).sort({ createdAt: -1 });
    const response = user.slice(startIndex, endIndex);
    const totalPages = Math.ceil(user.length / limit);
    res.status(200).json({
      status: "Success",
      message: "User fetched successfully",
      data: response,
      pagination: {
        limit: limit,
        total: user.length,
        total_pages: totalPages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User fetched successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await User.findById(id);
    res.status(200).json({
      status: "Success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
};
