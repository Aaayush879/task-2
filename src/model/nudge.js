const mongoose = require('mongoose');
const nudgeSchema = new mongoose.Schema({
    tag:{
        type:String
    },
    title:{
        type:String,
    },

    image:{
        type:String
    },
    description:{
        type:String
    },
    icon:{
        type:String
    }
    ,
    invitation:{
        type:String
    }
    
});
const nudge = new mongoose.model('nudge',nudgeSchema);
module.exports = nudge;