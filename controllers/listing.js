  const Listing = require('../models/listing.js');

  module.exports.index=async (req,res)=>{
          let allListings =await Listing.find({});
          res.render("listings/index.ejs",{allListings});
      };

      module.exports.renderNewForm =(req,res)=>{    
      res.render('listings/new.ejs')  
      };
      
      module.exports.showListing=async (req,res)=>{
              let{id}=req.params;
              const listing= await Listing.findById(id).populate({path:"review",populate:{path:"author"}}).populate("owner");
              if(!listing)
              {
                  req.flash("errmsg","listing is not exist"); 
                  return  res.redirect("/listing")
              }
              console.log(listing.geometry);  
              res.render("listings/show.ejs",{listing});
          };

          module.exports.createNewListing=async (req,res,next)=>{
          
 async function geocode(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
 const url2 = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=1&q=${encodeURIComponent(address)}`;


  const response = await fetch(url2, {
    headers: {
      "User-Agent": "MyListingApp/1.0 (worlddigital728@gmail.com)",
      "Accept": "application/json"
    }
  });

  const text = await response.text();
  // console.log(text);

  const data = JSON.parse(text);

  if (!data.length) return null;
 
  return {
  type: "Point",
  coordinates: [
    parseFloat(data[0].lon), // longitude first
    parseFloat(data[0].lat)  // latitude second
  ]
};

  // return {
  //   lat: parseFloat(data[0].lat),
  //   lng: parseFloat(data[0].lon)
  // };
}

    let listingGeoCoding=req.body.listing.location;
    let geoCode= await geocode(listingGeoCoding);
    console.log("GeoCoding:",geoCode);
  
            let url=req.file.path;
            let filename=req.file.filename;
          
          if(!req.body.listing)
          {
              throw new expressError(400,"Send valid data for listing");
          }

        let listing=req.body.listing;
        const newListing=new Listing(listing);
        newListing.owner=req.user._id;
        newListing.image={url,filename};
        newListing.geometry=geoCode;
        //console.log(newListing.img);

        if(!newListing.title)
        {
          throw new expressError(400,"title is missing");
        }
        if(!newListing.price)
        {
          throw new expressError(400,"price is missing");
        }if(!newListing.country)
        {
          throw new expressError(400,"country is missing");
        }
          let  savedListing=await newListing.save();
          console.log(savedListing);
          req.flash("successmsg","new listing created");
          res.redirect("/listing");
          
      }

      module.exports.renderEditForm=async (req,res)=>{
              let{id}=req.params;
              const listing= await Listing.findById(id);
            let orginalImageUrl=listing.image.url;
              orginalImageUrl=orginalImageUrl.replace("/upload","/upload/h_300,w_250");

              res.render("listings/edit.ejs",{listing,orginalImageUrl});
          }

          module.exports.updateListing=async (req,res)=>{
                let{id}=req.params;
                let listing=await Listing.findByIdAndUpdate(id,{...req.body.listing});
                if(typeof req.file!=="undefined"){
                let url=req.file.path;
                let filename=req.file.filename;
                listing.img={url,filename}
                await listing.save();
              }
                  res.redirect(`/listing/${id}`); 
              };
              
              module.exports.destroyListing=async(req,res)=>{
          let{id}=req.params;
          await Listing.findByIdAndDelete(id);
          req.flash("successmsg","new listing deleted");
          res.redirect("/listing");
      }