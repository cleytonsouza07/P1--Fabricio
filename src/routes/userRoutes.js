const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const userController = new UserController();

router.post('./usuarios/registrar', (req, res) => userController.registerUser(req, res));

module.exports = router;
