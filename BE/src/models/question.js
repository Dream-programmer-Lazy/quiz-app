const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  options: [{ type: String, required: true }], // Danh sách đáp án (4 lựa chọn)
  answer: { type: Number, required: true }, // Chỉ số đáp án đúng (0-3)
  type: { type: String, enum: ['multiple-choice', 'true-false'], default: 'multiple-choice' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Question', questionSchema);
