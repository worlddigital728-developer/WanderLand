const Listing=require('./models/listing.js');
const Review=require('./models/reviews.js')
//checks user is login or not 
module.exports.isLoggedIn= (req,res,next)=>{
        if(!req.isAuthenticated())
        {      req.session.redirectUrl=req.originalUrl;
            req.flash("errmsg","user must be logged in to create listing");
            return res.redirect('/login');
        }
    next();
    }
        //save the path where user want to go wihout login 
    module.exports.saveRedirectUrl=(req,res,next)=>{
        if(req.session.redirectUrl)
        {
            res.locals.redirectUrl=req.session.redirectUrl;
           
        }
         next();
    }
//
module.exports.isOwner=async (req,res,next)=>{
    let {id}=req.params;
    let listing=await Listing.findById(id);

    if(!listing.owner._id.equals(res.locals.currUser._id))
    {
        req.flash("errmsg","user donn't have permission to do this");
      return  res.redirect(`/listing/${id}`); 
    } 
    next();
}
module.exports.isReviewAuthor=async(req,res,next)=>{
     let {id,reviewId}=req.params;
    let review=await Review.findById(reviewId);

    if(!review.author._id.equals(res.locals.currUser._id))
    {
        req.flash("errmsg","you are not author of this review");
        return res.redirect(`/listing/${id}`); 
    } 
    next();
}