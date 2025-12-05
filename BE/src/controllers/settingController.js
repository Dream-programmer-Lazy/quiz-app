
const settingService = require('../services/settingService');

const createSetting = async (req, res) => {
  try {
    const setting = await settingService.createSetting(req.body);
    return res.status(201).json(setting);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const getSettingByUser = async (req, res) => {
  try {
    const setting = await settingService.getSettingByUser(req.params.userId);
    if (!setting) {
      return res.status(404).json({ error: { message: "Setting not found!" } });
    }
    return res.status(200).json(setting);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const updateSettingByUser = async (req, res) => {
  try {
    const setting = await settingService.updateSettingByUser(req.params.userId, req.body);
    if (!setting) {
      return res.status(404).json({ error: { message: "Setting not found!" } });
    }
    return res.status(200).json(setting);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const deleteSettingByUser = async (req, res) => {
  try {
    const setting = await settingService.deleteSettingByUser(req.params.userId);
    if (!setting) {
      return res.status(404).json({ error: { message: "Setting not found!" } });
    }
    return res.status(200).json({ message: "Delete setting successfully." });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

module.exports = {
  createSetting,
  getSettingByUser,
  updateSettingByUser,
  deleteSettingByUser
};
