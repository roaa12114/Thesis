const mongoose = require('mongoose')

const PurchaseSchema = mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    items:[{
        furnitureId:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required:true
        }
    }],
    amount_paid:{
        type: Number,
        required: true
    },
    
},
{
    timestamps: true
});

const PurchaseModel = mongoose.model("Purchase", PurchaseSchema, "purchases")

module.exports = PurchaseModel