const express = require('express');
const collegeController = require('../controllers/collegeController');

const router = express.Router();

router.route('/').get(collegeController.getAddressBasedColleges, collegeController.getAllColleges);

router.route('/:id').get(collegeController.getCollege);

router
  .route('/:id/colleges-within/:distance/unit/:unit/having-students/:range')
  .get(collegeController.displayNearbyColleges);

module.exports = router;
