const express = require('express')
const Purchase = require('../models/Purchase.js');
const Furniture = require('../models/Furniture.js');
const User = require('../models/User.js');
const router = express.Router()


router.get('/get-purchase-by-id/:purchaseId', async(req,res)=>{
    const {purchaseId} = req.params;

    try{
        const purchases = await Purchase.findOne({_id: purchaseId});
        res.status(200).json(purchases)
    }catch(err){
        res.status(400).json("no purchases with given id")
    }
    
})

router.get('/get-purchase-by-user-id/:userId', async(req, res)=>{
    const userId = req.params;

    try{
        const purchases = await Purchase.find({userId: userId});
        res.status(200).json(purchases)
    }catch(err){
        res.status(400).json("no purchases with given user id")
    }
})

const checkIfFurnituresExist = async (items) =>{
    var allExists = true;

    for(let i=0; i < items.length; i++)
    {
        const furnitureId = items[i].furnitureId;
        const quantity = items[i].quantity;

        const furniture = await Furniture.findOne({_id: furnitureId});
        if(furniture.quantity < quantity){
            allExists = false;
            break;
        }
    }

    return allExists
}

router.post('/make-purchase', async (req, res)=>{
    
    const {userId, items, amount_to_pay} = req.body;

    try{
        console.log("Hello 1")
        const user = await User.findOne({_id: userId});
        console.log("Hello 2")
        
        const furnitureExists = await checkIfFurnituresExist(items)
        console.log("Hello 3")

        if(amount_to_pay <= user.wallet && furnitureExists === true)
        {
            //do the purchase
        console.log("Hello 4")

            const newPurchase = new Purchase({
                userId:userId,
                items: items,
                amount_paid: amount_to_pay
            })
            const savedPurchase = await newPurchase.save();
            console.log("Hello 5")
            
            //update quantity and user wallet
        console.log("Hello 6")
            
            items.forEach(async(item)=>{
                const furnitureId = item.furnitureId;
                const quantity = item.quantity;

                await Furniture.findByIdAndUpdate(furnitureId,{
                    $inc: {quantity: -quantity},
                    $new: true
                })
            })
        console.log("Hello 7")


            await User.findByIdAndUpdate(userId, {
                $inc:{wallet: -amount_to_pay},
                $new: true
            })
            console.log("Hello 8")
            
            res.status(200).json(savedPurchase);
        }else{
            res.status(400).json("Insufficient Funds or Insufficient Furniture Quantity")
        }
    }catch(err){
        res.status(400).json("Purchase Failed")
        
    }
})

module.exports = router;