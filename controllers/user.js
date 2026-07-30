
const user=require('../models/user.js')

module.exports.renderSignupForm=(req,res)=>{
    res.render("user/signup.ejs");
}

module.exports.signup=async (req,res)=>{
   try
   { let{username,email,password}=req.body;
    let newUser= new user({email,username});
    let registerUser=await user.register(newUser,password);
    //registerUser will return the new user who just new signup
    req.login(registerUser,(err)=>{
        if(err)
        {
            return next(err);
        }
        req.flash("success","Welcome to wanderlust");
        res.redirect("/listing"); 
    })}
    catch(e)
    {req.flash("errmsg",e.message); 
    res.redirect('/signup')}
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("user/login.ejs")
};
module.exports.login=async(req,res)=>
    {
    req.flash("successmsg","Welcome back to wonderlust");
    // let redirectUrl=res.locals.redirectUrl || "/listing";
    let redirectUrl=res.locals.redirectUrl;
    if(redirectUrl)
         res.redirect(redirectUrl);
     else {
         res.redirect("/listing");
     }
}
module.exports.logout=(req,res,next)=>{
    req.logout(err=>{
        if(err)
        {
             return next(err);
        }
        req.flash("successmsg","you successfully logout");
        res.redirect('/listing');
    })
}