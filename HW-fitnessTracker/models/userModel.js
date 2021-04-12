const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// workout schema providing different workout information
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: () => new Date(),
  },
  exercises: [{
    type: {
      type: String,
      trim: true,
      required: 'Enter a type of exercise',
    },
    name: {
      type: String,
      trim: true,
      required: 'Enter an exercise name',
    },
    duration: {
      type: Number,
      required: 'Enter duration of the exercise',
    },
    weight: {
      type: Number,
    },
    reps: {
      type: Number,
    },
    sets: {
      type: Number,
    },
    distance: {
      type: Number,
    },
  }] 
});

const userWorkout = mongoose.model('userWorkout', workoutSchema);

module.exports = userWorkout;