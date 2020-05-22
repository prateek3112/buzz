const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/buzz_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to Database'));

db.once('open',function()
{
    console.log('Connected to Db');
});

module.exports = db;