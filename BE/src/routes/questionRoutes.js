const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

router.post('/', questionController.createQuestion);
router.get('/random', questionController.getRandomQuestions);
router.get('/:id', questionController.getQuestionById);
router.get('/', questionController.getAllQuestions);
router.patch('/:id', questionController.updateQuestionById);
router.delete('/:id', questionController.deleteQuestionById);

module.exports = router;
