
const express = require('express');
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/login', authController.login);
router.post('/setup-password', authController.setupPassword);

// Authentication routes
router.post('/logout', authController.logout);
router.get('/me', authenticateToken, authController.getCurrentUser);

// Protected routes
router.get('/', authenticateToken, authController.getAllUsers);
router.post('/', authController.createUser);
router.put('/:id', authenticateToken, authController.updateUser);
router.delete('/:id', authenticateToken, authController.deleteUser);

module.exports = router;
