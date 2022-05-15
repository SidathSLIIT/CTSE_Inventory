const mongoose = require('mongoose');


const InventorySchema = new mongoose.Schema({
    inventoryName: {
        type: String,
        required: true,
    },
    inventoryCount: {
        type: Number,
        required: true,
    },
    inventoryPrice: {
        type: Number,
        required: true,
    },
    inventoryDesc: {
        type: String,
    },
    inventoryImage: {
        type: String,
        required: true,
    },
},{ timestamps: true });

module.exports = mongoose.model('inventories', InventorySchema);