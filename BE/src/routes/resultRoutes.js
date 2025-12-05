const express = require('express');
const router = express.Router();
const resultController = require('../controllers/resultController');


router.post('/', resultController.createResult);
router.get('/user/:userId', resultController.getResultsByUserId);
router.get('/:id', resultController.getResultById);
router.get('/', resultController.getAllResults);
router.patch('/:id', resultController.updateResultById);
router.delete('/:id', resultController.deleteResultById);

module.exports = router;
