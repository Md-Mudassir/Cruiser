const AppError = require('./../utils/appError');

//if not logged in
const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  let error = { ...err };
  error.message = err.message;

  if (error.name === 'JsonWebTokenError') error = handleJWTError();
  sendErrorDev(err, req, res);
};
