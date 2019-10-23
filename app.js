const express = require('express');
const app = express();
const fs = require('fs');

const PORT = process.env.PORT || 3700;

// app.use('/', (req, res) => {
//   res.status(200).json({ message: 'Hello' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    message: 'success',
    data: {
      tours: tours
    }
  });
});
app.listen(PORT, () => {
  console.log(`Started @ ${PORT}`);
});
