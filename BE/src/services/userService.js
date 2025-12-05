
const User = require('../models/user');

async function createUser(data) {
  return await User.create(data);
}

async function getAllUsers() {
  return await User.find();
}

async function getUserById(id) {
  return await User.findById(id);
}

async function updateUserById(id, data) {
  return await User.findByIdAndUpdate(id, data, { new: true });
}

async function deleteUserById(id) {
  return await User.findByIdAndDelete(id);
}


async function loginUser({ email, password }) {

  const query = { email };
  const user = await User.findOne(query);
  if (!user) return null;
  if (user.password !== password) return null;
  return user;
}


async function getUserByEmail(email) {
  return await User.findOne({ email });
}

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  getUserByEmail
};
