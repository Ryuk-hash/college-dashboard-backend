const College = require('../models/collegeModel');

const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const { courses } = require('../utils/MockData');

exports.getAddressBasedColleges = catchAsync(async (req, res, next) => {
  const { city, state, country } = req.query;

  if (city || state || country) {
    req.query['address.state'] = state;
    req.query['address.city'] = city;
    req.query['address.country'] = country;
  }

  next();
});

exports.getAllColleges = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(College.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const colleges = await features.query;
  res.status(200).json({
    status: 'success',
    results: colleges.length,
    data: {
      colleges,
    },
  });
});

exports.getCollege = catchAsync(async (req, res, next) => {
  const college = await College.findById(req.params.id);

  if (!college) {
    return next(new AppError(`No such college found with id >${req.params.id}<`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      college,
    },
  });
});

// constraints (can be added/worked on - if needed):
// 1) location based filtering : inside given radius
// 2) student range provided: +/- that range
// 3) courses based searching: if provide same type of courses
exports.displayNearbyColleges = catchAsync(async (req, res, next) => {
  const { id, distance, unit, range } = req.params;

  // Fetch college based on provied ID
  const college = await College.findById(id);

  // Check if college record exists or not
  if (!college) {
    return next(
      new AppError(
        "College related to that ID doesn't exist! Please try again with a valid ID!",
        404
      )
    );
  }

  // Location based filtering
  const currentLoc = college.address.loc.coordinates,
    lng = currentLoc[0],
    lat = currentLoc[1],
    radius = unit === 'km' ? distance / 6378.1 : distance / 3963.2,
    students = college.students,
    lowerBound = students - range * 1,
    upperBound = students + range * 1;

  let nearbyColleges = await College.find({
    'address.loc': {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },

    // Student range provided
    students: { $gt: lowerBound, $lt: upperBound },
  });

  // Courses Based Searching
  function findCommonElements(arr1, arr2) {
    return arr1.some((item) => arr2.includes(item));
  }

  let oldArray = courses;
  nearbyColleges = nearbyColleges.filter((item) => {
    const newArray = item.courses;
    const flag = findCommonElements(oldArray, newArray);
    oldArray = newArray;
    return flag;
  });

  // Remove original record from list
  nearbyColleges = nearbyColleges.filter(function (obj) {
    return obj.id !== id;
  });

  // Empty array means that no other college in that radius was located which passed the constraint-checks!
  res.status(200).json({
    status: 'success',
    results: nearbyColleges.length,
    colleges: nearbyColleges,
  });
});
