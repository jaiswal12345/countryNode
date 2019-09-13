var mongoose = require('mongoose');

var userModel = mongoose.model("Users",{
    email: {type:String,required:true,unique:true},
    password:{type:String,required:[true,"password is mandatory field"], minlength:[4,"minimun length should be 4 characters"]},
    role:{type:Number,required:true},
    active:{type:Boolean,default:true},
    lastUpdated:{type:Date,default:Date.now}
});

module.exports = userModel;