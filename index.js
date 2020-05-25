const express = require('express');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');



app.use(sassMiddleware({
  
    src : './assets/scss',
    dest : './assets/css',
    debug :'true',
    outputStyle : 'expanded',
    prefix : '/css'


}));

app.use(express.static('./assets'));
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
app.use(express.urlencoded());
app.use(expressLayouts);
app.use(cookieParser());





const port = 8000;

app.set('view engine', 'ejs');

app.set('views','./views');

app.use(session({

 name : 'buzz',
 secret : 'ILOVEYOU',
 saveUninitialized : false,
 resave : false,
 cookie : {
     maxAge : (1000*60*100)
 },
 store : new MongoStore({
  mongooseConnection : db,
  autoremove : 'disabled'

 },
  function(err)
  {
      console.log(err || 'connect mongodb setup ok');
  }
 )



}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.SetAuthenticatedUser);

app.use('/',require('./routes'));  //routes niche likkhne chie

app.listen(port,function(err)
{
    if(err)
    {
        console.error(`Error in running the server : ${err}`);
    }
    console.log(`Server running on port : ${port}`);
})