module.exports.home = function(req,res)
{
    // return res.end('<h1>Express is Up!');
    return res.render('home',
    {
        title : "Welcome to Buzz",
        heading : "Home"
    })
}

module.exports.trending = function(req,res)
{
    return res.end('<h1>Here you can see the latest trends</h1>');
}