 const express=require('express');
 const router=express.Router({mergeParams:true});
 const mongoose=require('mongoose');
 const Listing = require('../models/listing.js');
 const Review=require('../models/reviews.js');
 const wrapAsync=require('../utils/wrapAsync.js');
 const expressError=require('../utils/expressError.js');
 const { isLoggedIn, isReviewAuthor } = require('../middleware.js');
 const reviewController=require('../controllers/review.js');

     // Review Create Route
    router.post("/",isLoggedIn,wrapAsync(reviewController.createReview));

    //delete Review Route
    router.delete("/:reviewId",isReviewAuthor,wrapAsync(reviewController.destroyReview));
 
    module.exports=router;