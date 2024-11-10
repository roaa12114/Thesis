const mongoose = require('mongoose')

const FurnitureSchema = mongoose.Schema({
    name:{
        type:"String",
        required: true,
    },
    mtl_file:{
        type:"String",
        required: false
    },
    obj_file:{
        type:"String",
        required: false
    },
    desc:{
        type:"String",
        required: false
    },
    price:{
        type:"Number",
        required:true
    },
    image:{
        type:"String",
        required:true
    },
    quantity:{
        type:"Number",
        required:true
    }
},
{
    timestamps: true
});

const FurnitureModel = mongoose.model("Furniture", FurnitureSchema, "furnitures")

module.exports = FurnitureModel