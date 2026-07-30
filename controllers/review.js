const Listing=require('../models/listing.js')
const Review=require('../models/reviews.js')

module.exports.createReview=async (req,res)=>{
        let prevListing= await Listing.findById(req.params.id);
        
        let newReview= new Review(req.body.review);
        newReview.author=req.user._id;
          
        prevListing.review.push(newReview);
        await newReview.save();
        await prevListing.save();
        console.log("review saved");
        res.redirect(`/listing/${req.params.id}`)
    }
    module.exports.destroyReview=async (req,res)=>{
        let{id,reviewId}=req.params;
        await Listing.findByIdAndUpdate(id,{$pull: {review:reviewId}});
        await Review.findByIdAndDelete(reviewId);
        console.log(id,reviewId)
        res.redirect(`/listing/${id}`);
    }