const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/login', userController.loginUser);
router.post('/', userController.createUser);
router.get('/email/:email', userController.getUserByEmail);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.patch('/:id', userController.updateUserById);
router.delete('/:id', userController.deleteUserById);

module.exports = router;
