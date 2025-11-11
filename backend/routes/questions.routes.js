
const express = require('express');
const Question = require('../models/Question');
const router = express.Router();


router.get('/random', async (req, res) => {
  const count = parseInt(req.query.count) || 5;

  if (count < 1 || count > 20) {
    return res.status(400).json({ error: 'Số câu hỏi phải từ 1 đến 20' });
  }

  try {

    const total = await Question.countDocuments();
    if (total === 0) {
      return res.status(404).json({ error: 'Chưa có câu hỏi nào trong hệ thống' });
    }


    const questions = await Question.aggregate([{ $sample: { size: count } }]);
    res.status(200).json(questions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});


router.post('/', async (req, res) => {
  const { content, type, correctAnswer, options } = req.body;

  if (!content || !type || !correctAnswer) {
    return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' });
  }

  if (!['true_false', 'multiple_choice'].includes(type)) {
    return res.status(400).json({ error: 'Loại câu hỏi không hợp lệ' });
  }

  if (type === 'multiple_choice' && (!options || options.length !== 4)) {
    return res.status(400).json({ error: 'Câu hỏi 4 lựa chọn phải có đúng 4 đáp án' });
  }

  try {
    const question = new Question({
      content,
      type,
      correctAnswer,
      options: type === 'multiple_choice' ? options : null
    });

    await question.save();
    res.status(201).json({
      message: 'Thêm câu hỏi thành công',
      question
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
});

module.exports = router;
