const express = require('express');
const bodyParser = require('body-parser');

const movieRouter = require('./Routes/movies');

const app = express();

app.use(bodyParser.json());
app.use('/movies', movieRouter);

app.listen(8080, () => {"Server running on port 8080"});