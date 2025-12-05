
const Result = require('../models/result');

async function createResult(data) {
  return await Result.create(data);
}

async function getAllResults() {
  return await Result.find().populate('user').populate('answers.question');
}

async function getResultById(id) {
  return await Result.findById(id).populate('user').populate('answers.question');
}

async function updateResultById(id, data) {
  return await Result.findByIdAndUpdate(id, data, { new: true });
}

async function deleteResultById(id) {
  return await Result.findByIdAndDelete(id);
}

async function getResultsByUserId(userId) {
  return await Result.find({ user: userId }).populate('user').populate('answers.question');
}

module.exports = {
  createResult,
  getAllResults,
  getResultById,
  updateResultById,
  deleteResultById,
  getResultsByUserId
};
