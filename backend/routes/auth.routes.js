
const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/login', async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Vui lòng nhập username' });
  }

  try {

    let user = await User.findOne({ username });


    if (!user) {
      user = new User({ username });
      await user.save();
    }
    res.status(200).json({
      message: 'Đăng nhập thành công',
      user: {
        id: user._id,
        username: user.username,
        settings: user.settings
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

module.exports = router;
