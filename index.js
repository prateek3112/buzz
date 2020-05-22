const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./config/mongoose');

app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(cookieParser());


app.use('/',require('./routes'));

const port = 8000;

app.set('view engine', 'ejs');

app.set('views','./views');

app.listen(port,function(err)
{
    if(err)
    {
        console.error(`Error in running the server : ${err}`);
    }
    console.log(`Server running on port : ${port}`);
})