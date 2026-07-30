const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listing.js');

main().then(res=>{
    console.log("connection succesful");
}).catch(err=>{
    console.log(err);
});
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderland");    
}
const initDb= async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>{
        return {...obj,owner:"6a622ff83c7faee7275e669c"};
 });
    await Listing.insertMany(initData.data);
    console.log("data is initialized");
}

initDb();