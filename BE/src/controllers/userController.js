

const userService = require('../services/userService');
const settingService = require('../services/settingService');


const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    // Tạo setting mặc định cho user mới
    await settingService.createSetting({ user: user._id });
    return res.status(201).json(user);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: { message: "User not found!" } });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ error: { message: "User not found!" } });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const user = await userService.deleteUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: { message: "User not found!" } });
    }
    return res.status(200).json({ message: "Delete user successfully." });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};


const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if ((!username && !email) || !password) {
      return res.status(400).json({ error: { message: "Username/email và password là bắt buộc!" } });
    }
    const user = await userService.loginUser({ username, email, password });
    if (!user) {
      return res.status(401).json({ error: { message: "Sai thông tin đăng nhập!" } });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};


const getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email || req.query.email;
    if (!email) {
      return res.status(400).json({ error: { message: "Email là bắt buộc!" } });
    }
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: { message: "User not found!" } });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  getUserByEmail
};
