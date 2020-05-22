const User = require('../models/user');

module.exports.profile = function(req,res)
                                { 
                                    // return res.end('<h1>User profile</h1>');
                                    return res.render('user_profile',
                                    {
                                        title : 'User Profile'
                                    })
                                }

module.exports.posts = function(req,res)
{
    return res.end('<h1>Here are all your posts</h1>');
}


module.exports.signUp = function(req,res)
{
    return res.render('user_sign_up',
    {
        title : 'Buzz | Sign Up'

    });
}

module.exports.signIn = function(req,res)
{
    return res.render('user_sign_in',
    {
        title : 'Buzz | Sign In'

    });
}

module.exports.create = function(req,res)
{
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    User.findOne({ email : req.body.email},function(err,user)
    {
        if(err)
        {
            console.log('Error in finding user in signing up'); return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err)
                {
                    console.log('Error in creating user in signing up'); return;
                }
                return res.redirect('/users/sign-in');
            })
        }
        else 
        {
            return res.redirect('back');
        }
    });
}

module.exports.createSession = function(req,res)
{
    //todo
}