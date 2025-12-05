
const Setting = require('../models/setting');

async function createSetting(data) {
  return await Setting.create(data);
}

async function getSettingByUser(userId) {
  return await Setting.findOne({ user: userId });
}

async function updateSettingByUser(userId, data) {
  return await Setting.findOneAndUpdate({ user: userId }, data, { new: true, upsert: true });
}

async function deleteSettingByUser(userId) {
  return await Setting.findOneAndDelete({ user: userId });
}

module.exports = {
  createSetting,
  getSettingByUser,
  updateSettingByUser,
  deleteSettingByUser
};
