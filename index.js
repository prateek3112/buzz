const express = require('express');

const app = express();

app.use('/',require('./routes'));

const port = 8000;

app.listen(port,function(err)
{
    if(err)
    {
        console.error(`Error in running the server : ${err}`);
    }
    console.log(`Server running on port : ${port}`);
})