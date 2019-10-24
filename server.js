const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const path = require('path');
const items = require('./routes/api/items');
const users = require('./routes/api/users');

const app = express();
const port = process.env.PORT || 5000;

//Bodyparser middleware
app.use(express.json());

//Connect to the DB

const dbUri = config.get('dbUri');


mongoose.connect(dbUri,
         { 
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useCreateIndex: true
         })
        .then(() => console.log('Database connected ...'))
        .catch( err => console.log(err));

//Use routes
app.use('/api/items',items);
app.use('/api/users', users);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
        //Set static folder
        app.use(express.static('client/build'));

        app.get('*', (req, res) => {
                res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
        });
}


app.listen(port, console.log(`Server running on port ${port}`));