const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type:String,
        require: true   
    },
    Price: {
        type:Number,
        require: true   
    },
    taste: {
        type:String,
        enum: ['sweet','spicy','khata'],
        require: true   
    },
    is_drink: {
        type:Boolean,
        default: false     
    },
    ingriants:{
        type:[String],
        default: []
    },
    num_sales:{
        type: Number,
        defult:0,
    }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
