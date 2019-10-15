const express = require('express');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

//Bodyparser middleware
app.use(express.json());

//Connect to the DB
const dbUri = require('./config/keys').dbUri;

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('Database connected ...'))
        .catch( err => console.log(err));


app.listen(port, console.log(`Server running on port ${port}`));