const router = require("express").Router();
const workout = require("../models/userModels.js");

router.post("/api/workouts", (req, res) => {
  workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// we want to use aggregate to find total amount of time spent in the workout
router.get("/api/workouts", ( req, res) => {
  workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//  View the combined weight of multiple exercises from the past seven workouts on the `stats` page
router.get("/api/workouts/range", ( req, res) => {
  workout.aggregate([
    {
      $addFields: {
        totalDuration: {
          $sum: "$exercises.duration"
        },
      },
    },
  ])
    .sort({_id: -1})
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout)
    })
    .catch(err => {
      res.status(400).json(err);
    });
});


router.put("/api/workout/:id", ({ body, params }, res) => {
  workout.findByIdAndUpdate(
    params.id,
    {
       $push: 
    })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.delete("/api/workouts", ({ body }, res) => {
  workout.findByIdAndDelete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;
