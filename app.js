   if(process.env.NODE_ENV!="production"){
   require('dotenv').config()
   }
  
   
   const express=require('express');
    const app=express();
    //mongodb package for mongodb installation
    const mongoose=require('mongoose');

    //mongodb models
    const Review=require('./models/reviews.js');
    const Listing = require('./models/listing.js');
    const User=require('./models/user.js');

    //path specifier for express
    const path=require('path');

    //all request handler
    const methodOverride=require('method-override');

    //boilerplete ejs
    const ejsMate=require('ejs-mate');

    //error handling
    const wrapAsync=require('./utils/wrapAsync.js');
    const expressError=require('./utils/expressError.js');

    //router object
    const listingRouter=require('./routes/listing.js');
    const reviewRouter=require('./routes/review.js');
    const userRouter=require('./routes/user.js');

    //for authentication
    const passport=require('passport');
    const localStrategy=require('passport-local');

    //session
    const session=require('express-session');
    //session store
    const MongoStore = require('connect-mongo').default;
    //flash for showing message
    const flash=require('connect-flash');
   //dns
    const dns=require('dns');
    dns.setServers(['1.1.1.1','8.8.8.8']);

    app.set("view engine","ejs");
    app.set("views",path.join(__dirname,"views"));
    app.use(express.urlencoded({extended:true}));
    app.use(methodOverride("_method"));
    app.engine('ejs',ejsMate);
    app.use(express.static(path.join(__dirname,"/public")));
    const dbUrl=process.env.ATLASDB_URL;
    console.log(MongoStore)
 const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
        },
        touchAfter:24*3600,
 }) 
store.on("error",()=>{
    console.log("Error in mongoose store session")
})
const sessionOps={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+ 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true,

    }
}
     //session and flash message
    app.use(session(sessionOps));   
    app.use(flash());
    //for authentication middleware
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStrategy(User.authenticate()));
    // for creating sign in session
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
    //flash message middleware
    app.use((req,res,next)=>{
        res.locals.successmsg=req.flash("successmsg");
         res.locals.errmsg=req.flash("errmsg");
         res.locals.currUser=req.user;
        next();
    });
// app.get("/demouser",async (req,res)=>{
//     let newUser=new User(
//         {
//             email:"zafar33@gmail.com",
//             username:"this is me",
//         })
//      let registerUser=await User.register(newUser,"hello");
//      res.send(registerUser)
// })

    //routes for listing and review
     app.use("/listing",listingRouter);
     app.use("/listing/:id/review",reviewRouter);
     app.use("/",userRouter)
     app.get("/", (req, res) => {
    res.redirect("/listing");
});

    //  mongdbUrl="mongodb://127.0.0.1:27017/wanderland";
  
    //connection with mongodb
    main().then(res=>{console.log("connection succesful")}).catch(err=>{console.log(err)});
    async function main() {
        console.log(dbUrl)
        await mongoose.connect(dbUrl);    
    }

    // app.get("/",(req,res)=>{
    //     res.send("working");
    // });
    // app.get("/testListing",async (req,res)=>{
    //     let sampleListing=new Listing({
    //         title:"New villa",
    //         description:"front of beach",
    //         country:"pakistan",
    //         price:3000,
    //         location:"multan,pakistan"
    //     }
    //     );
    //     await sampleListing.save();
    //     console.log("saved success");
    //     res.send("Data inserted in database");
    // })
    
   
    //for the rest wrong routes
    app.use((req,res,next)=>{next(new expressError(404,"page is not exist"))} );
    //middleware

    app.use ((err,req,res,next)=>{
    let{status=505,message="page not found"}=err;
    res.render("listings/error.ejs",{message});
    // res.status(status).send(message);
    })

    app.listen(3000,()=>{
        console.log("website is listening on port 3000");
    })