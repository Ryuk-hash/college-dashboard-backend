const Student = require('../models/studentModel');

const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getAllStudents = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Student.find().populate('college', 'name'), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const students = await features.query;
  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students,
    },
  });
});
