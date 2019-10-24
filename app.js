const express = require('express');
const app = express();
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3700;

dotenv.config({ path: './config.env' });
console.log(process.env);
app.use(express.json());

app.use((req, res, next) => {
  console.log('hello from middleware');
  next();
});

const tourRouter = require('./public/routes/tourdetails');

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    msg: 'not yet defined'
  });
};

app.route('/api/v1/users').get(getAllUsers);
// .post(createUser);

// app
//   .route('/api/v1/users/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);
// router.get('/api/v1/tours/:id', getTour);

app.use('/api/v1/tours', tourRouter);

app.listen(PORT, () => {
  console.log(`Started ${PORT}`);
});
