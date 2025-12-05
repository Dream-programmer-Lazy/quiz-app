const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  backgroundMusic: { type: Boolean, default: false },
  soundEffects: { type: Boolean, default: false },
  timerPerQuestion: { type: Boolean, default: false },
  timerTest: { type: Boolean, default: false },
  questionCount: { type: Number, default: 5 },
  avatar: { type: String }
});

module.exports = mongoose.model('Setting', settingSchema);
