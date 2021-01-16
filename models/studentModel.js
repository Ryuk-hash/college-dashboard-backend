const mongoose = require('mongoose');

//************************************************************************************
// **************** IMPORTS TO GENERATE STUDENT DATA ****************
//************************************************************************************
// const faker = require('faker');
// const { getRandom, setRandomValue, randomNumber } = require('../utils/createMockData');
// const { skills } = require('../utils/MockData');
// const College = require('./collegeModel');

// Student Model
const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Student's name must be provided!"],
    trim: true,
    minlength: [5, 'Student Name must have at least 5 characters'],
    maxlength: [30, 'Student Name must have at most 30 characters'],
  },

  batchyear: {
    type: Number,
    required: [true, 'Please provide a valid batch year!'],
  },

  skills: {
    type: [String],
    required: [true, 'Skills are necessary!'],
  },

  college: { type: mongoose.Schema.Types.ObjectId, ref: 'College' },
});

const Student = mongoose.model('Student', studentSchema);

//************************************************************************************
// **************** CODE TO GENERATE STUDENT DATA ****************
//************************************************************************************
// let students = [];
// const forLoop = async (_) => {
//   const colleges = await College.find();
//   colleges.forEach((record) => {
//     for (let i = 0; i < 50; i += 1) {
//       //college name
//       const name = faker.name.firstName() + ' ' + faker.name.lastName();
//       //skills
//       finalskills = getRandom(skills, setRandomValue());

//       let newStudent = {
//         name,
//         skills: finalskills,
//       };

//       newStudent = {
//         ...newStudent,
//         college: record._id,
//         batchyear: randomNumber(record.year, 2021),
//       };
//       // console.log(newStudent);

//       // students.push(newStudent);
//     }
//   });
//   // Student.insertMany(students);
// };
// // forLoop();
module.exports = Student;
