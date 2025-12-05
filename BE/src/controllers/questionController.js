
const questionService = require('../services/questionService');

const createQuestion = async (req, res) => {
  try {
    const question = await questionService.createQuestion(req.body);
    return res.status(201).json(question);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const getAllQuestions = async (req, res) => {
  try {
    const questions = await questionService.getAllQuestions();
    return res.status(200).json(questions);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const getQuestionById = async (req, res) => {
  try {
    const question = await questionService.getQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: { message: "Question not found!" } });
    }
    return res.status(200).json(question);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const updateQuestionById = async (req, res) => {
  try {
    const question = await questionService.updateQuestionById(req.params.id, req.body);
    if (!question) {
      return res.status(404).json({ error: { message: "Question not found!" } });
    }
    return res.status(200).json(question);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

const deleteQuestionById = async (req, res) => {
  try {
    const question = await questionService.deleteQuestionById(req.params.id);
    if (!question) {
      return res.status(404).json({ error: { message: "Question not found!" } });
    }
    return res.status(200).json({ message: "Delete question successfully." });
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};


const getRandomQuestions = async (req, res) => {
  try {
    const count = parseInt(req.query.count) || 5;
    const questions = await questionService.getRandomQuestions(count);
    return res.status(200).json(questions);
  } catch (error) {
    console.error("Server Error:", error);
    return res.status(500).json({ error: { message: "Server Error!" } });
  }
};

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
  getRandomQuestions
};
