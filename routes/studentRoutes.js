const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();

router.route('/').get(studentController.getAllStudents);

module.exports = router;
