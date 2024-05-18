import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    name:{
        type:String,
        default:""
    },
    email:{
        type:String,
    },
    // password:{
    //     type:String,
    // }
    avatarUrl:{
        type:String,
        required:true
    },
    profileUrl:{
        type:String,
    },
    likedProfiles:{
        type:[String],
        default:[]
    },
    likedBy:[
        {
            username:{type:String},
            avatarUrl:{type:String},
            likedDate:{type:Date, default:Date.now},
        }
    ]
},{timestamps:true})

export const User = mongoose.model("User", userSchema)