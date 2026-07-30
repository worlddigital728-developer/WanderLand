    const mongoose=require('mongoose');
    const Review=require('./reviews.js');
    const User=require('./user.js');
    const listingSchema=new mongoose.Schema(
        {
            title:{
                type:String,
                required:true,
            }
            ,
            description:String,
            image:{
                url:String,
                filename:String,
                // type:String,
                // default:"https://images.unsplash.com/photo-1627283391728-701007067e7e?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                // set:(v)=> v===""
                // ?"https://images.unsplash.com/photo-1627283391728-701007067e7e?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                // :v,    
            },
            price:Number,
            location:String,
            country:String,
            review:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"Review",
            },
                ],
        owner:
        { 
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",

        },
        geometry:{
        type: {
        type: String, // Don't do `{ location: { type: String } }`
        enum: ['Point'], // 'location.type' must be 'Point'
        required: true
        },
        coordinates: {
        type: [Number],
        required: true
        },
    },

        }
    );
    //middleware for mongoose two middleware pre and post pre first do this post later do this 
    listingSchema.post("findOneAndDelete",async (listing)=>{
        if(listing)
        {
            await Review.deleteMany({_id:{$in:listing.review}});
        }
    })
    const Listing=mongoose.model("Listing",listingSchema);
    module.exports=Listing;