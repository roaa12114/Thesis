const express = require('express')
const Furniture = require('../models/Furniture')
const router = express.Router();

router.get('/get-furnitures', async(req,res)=>{
    try{
        const furnitures = await Furniture.aggregate([{$sort: { createdAt: 1 }}]);
        res.status(200).json(furnitures);
    }catch(err){
        res.status(400).json("Could not load furnitures")
    }
})

router.get('/get-furniture-model/:id', async(req,res)=>{
    const {id} = await req.params;

    try{
        const {name, mtl_file, obj_file} = await Furniture.findOne({_id: id})
        res.status(200).json({name, mtl_file: mtl_file, obj_file:obj_file})
    }catch(err){
        res.status(400).json("Could not get 3d model files from given id")
    }
})

router.post('/add-furniture-quantity', async (req, res) => {
    const { furnitureId, quantity } = req.body;
  
    try {
      // Ensure the money is correctly parsed as a number
      const updatedFurniture = await Furniture.findByIdAndUpdate(
        furnitureId,
        { $inc: { quantity: +quantity } }, // Increment money value
        { new: true } // Return the updated document
      );
  
      if (updatedFurniture) {
        res.status(200).json(updatedFurniture);
      } else {
        res.status(404).json("Furniture not found");
      }
    } catch (err) {
      res.status(400).json("Update failed");
    }
  });

router.post('/add-furniture', async(req,res)=>{
    const {name, price, quantity, image, mtl_file, obj_file, desc } = await req.body;

    try{
        const newFurnitures = new Furniture(
            {
                name:name,
                price:price,
                image:image,
                quantity: quantity,
                mtl_file:mtl_file,
                obj_file:obj_file,
                desc:desc
            }
        );
        const savedFurniture = await newFurnitures.save()
        res.status(200).json(savedFurniture);
    }catch(err){
        res.status(400).json("Could not add furniture")
    }
})

module.exports = router;