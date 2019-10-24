const express = require('express');
const fs = require('fs');

const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync('/dev-data/data/tours-simple.json')
);

const getAllTours = (req, res) => {
  res.status(200).json({
    message: 'success',
    results: tours.length,
    data: {
      tours: tours
    }
  });
};

const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  if (!tour) {
    res.status(404).json({
      message: 'not found'
    });
  } else {
    res.status(200).json({
      message: 'success',
      data: {
        tour
      }
    });
  }
};

const addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    }
  );
};

module.exports = router;
