const mongoose=require('mongoose');
const moment=require('moment')

const NotesSchema=new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    task:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:moment().format().substring(0,10)
    },
    deadline:{
        type:Date,
        default:moment().format().substring(0,10)
    },
    state:{
        type:String,
        default:"not done"
    }
});

module.exports=mongoose.model('notes',NotesSchema);