const express = require('express');
const app = express();

const PORT = process.env.PORT || 3700;

app.use('/', (req, res) => {
  res.status(200).send('Hello');
});

app.listen(PORT, () => {
  console.log(`Started @ ${PORT}`);
});
