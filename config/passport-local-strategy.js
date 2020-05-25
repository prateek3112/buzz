const  passport = require('passport');

const User = require ('../models/user');

const LocalStrategy = require('passport-local').Strategy;

//auth Using Passport

passport.use(new LocalStrategy ({

usernameField : 'email' },

function(email,password,done){
    //find user and establish identity

    User.findOne({email:email},function(err,user)
    {
        if(err)
        {
           console.log('Error in finding the user');
           return done(err); 
        }
        if(!user || user.password != password)
        {
            console.log('Invalid details');
            return done(null,false);
        }
        return done(null,user);
    });

}




) );

//serializing the user to decide which key is to be kept in the cookies

passport.serializeUser(function(user,done)
{
    done(null,user.id);

});

//deserializing 

passport.deserializeUser(function(id,done){

    User.findById(id,function(err,user)
    {
        if(err)
        {
            console.log('Error in finding the user');
           return done(err); 
        }
        return done(null,user);
    });
});

passport.checkAuthentication = function(req,res,next)
{
    //if user is signed in the pass request to next function which is in controller
    if(req.isAuthenticated())
    {
        return next();

    }

    //if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.SetAuthenticatedUser = function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;}
        next();
    }











module.exports = passport;