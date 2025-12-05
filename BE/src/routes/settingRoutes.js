const express = require('express');
const router = express.Router();
const settingController = require('../controllers/settingController');

router.post('/', settingController.createSetting);
router.get('/:userId', settingController.getSettingByUser);
router.patch('/:userId', settingController.updateSettingByUser);
router.delete('/:userId', settingController.deleteSettingByUser);

module.exports = router;
