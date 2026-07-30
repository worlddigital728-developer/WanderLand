const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Listing = require('../models/listing.js');
const wrapAsync=require('../utils/wrapAsync.js'); 
const expressError=require('../utils/expressError.js');
const {isLoggedIn,isOwner}=require('../middleware.js')
const listingControllers=require('../controllers/listing.js')
const multer  = require('multer')
const {storage}=require('../cloudConfig.js')
const upload = multer({ storage }) //dest: 'uploads/'
 
 //create new listing
    router.get("/new",isLoggedIn,listingControllers.renderNewForm);
   //router route method 
router.route('/')
.get(wrapAsync(listingControllers.index)) //req.file will print the data about file being uploaded
.post(isLoggedIn,upload.single("listing[image]"),wrapAsync(listingControllers.createNewListing));
//router route method 
 router.route('/:id') 
.get(wrapAsync(listingControllers.showListing))  
.put(isLoggedIn,isOwner,upload.single("listing[image]"),wrapAsync(listingControllers.updateListing))
.delete(isLoggedIn,isOwner,wrapAsync(listingControllers.destroyListing));
    
    //edit route
    router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingControllers.renderEditForm));
    
    module.exports=router;