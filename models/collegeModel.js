const mongoose = require('mongoose');

//************************************************************************************
// **************** IMPORTS TO GENERATE COLLEGE DATA ****************
//************************************************************************************
// const faker = require('faker');
// const { getRandom, randomNumber, setRandomValue } = require('../utils/createMockData');
// const { courses, collegeRecords } = require('../utils/MockData');

// College Model
const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "College's name must be provided!"],
    trim: true,
    unique: true,
    minlength: [5, 'College Name must have at least 5 characters'],
    maxlength: [70, 'College Name must have at most 70 characters'],
  },

  year: {
    type: Number,
    required: [true, 'Please provide a valid founding year!'],
    min: 1970,
    max: 2021,
  },

  address: {
    country: {
      type: String,
      default: '',
    },
    state: {
      type: String,
      default: '',
    },
    city: {
      type: String,
      default: '',
    },
    loc: {
      type: {
        type: String,
        enum: ['Point'],
        required: true,
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },

  students: {
    type: Number,
    default: 0,
    min: 100,
    required: [true, 'College Total No. of students are necessary!'],
  },

  courses: {
    type: [String],
    required: [true, 'College Courses are necessary!'],
  },
});

const College = mongoose.model('College', collegeSchema);

//************************************************************************************
// **************** CODE TO GENERATE COLLEGE DATA ****************
//************************************************************************************
// let colleges = [];
// const runThis = () => {
//   collegeRecords.forEach((record) => {
//     //college name
//     const name = record.name,
//       //foundation year
//       year = new Date(
//         Math.floor(faker.time.recent() / 1000 - Math.random() * 1000000000) * 1000
//       ).getFullYear(),
//       //address related
//       city = record.city,
//       state = record.state,
//       country = record.country,
//       latitude = record.latitude,
//       longitude = record.longitude,
//       //total-students
//       students = randomNumber(100, 500);
//     //course taught
//     finalcourses = getRandom(courses, setRandomValue());

//     //Final address
//     const address = {
//       city,
//       state,
//       country,
//       loc: {
//         type: 'Point',
//         coordinates: [longitude, latitude],
//       },
//     };

//     let newCollege = {
//       name,
//       year,
//       address,
//       students,
//       courses: finalcourses,
//     };
//     // console.log(newCollege);
//     // colleges.push(newCollege);
//   });
// };

// runThis();
// College.insertMany(colleges);
module.exports = College;
