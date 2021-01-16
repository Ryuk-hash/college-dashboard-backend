const express = require('express');
const studentcontroller = require('../controllers/studentcontroller');

const router = express.Router();

router.route('/').get(studentcontroller.getAllStudents);

module.exports = router;
