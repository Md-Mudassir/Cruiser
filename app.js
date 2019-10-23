const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3700;

app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
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

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    msg: 'not yet defined'
  });
};
app.get('/api/v1/tours/:id', getTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(addTour);

app.route('/api/v1/users').get(getAllUsers);
// .post(createUser);

// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

app.listen(PORT, () => {
  console.log(`Started ${PORT}`);
});
