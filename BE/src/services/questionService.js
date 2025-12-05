
const Question = require('../models/question');

async function createQuestion(data) {
  return await Question.create(data);
}

async function getAllQuestions() {
  return await Question.find();
}

async function getQuestionById(id) {
  return await Question.findById(id);
}

async function updateQuestionById(id, data) {
  return await Question.findByIdAndUpdate(id, data, { new: true });
}

async function deleteQuestionById(id) {
  return await Question.findByIdAndDelete(id);
}


async function getRandomQuestions(count) {
  // Sử dụng aggregate $sample để lấy ngẫu nhiên count câu hỏi
  return await Question.aggregate([{ $sample: { size: count } }]);
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
  getRandomQuestions
};
