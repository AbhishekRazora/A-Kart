import mongoose, { Schema } from "mongoose";

const userSchema=new mongoose.Schema({

    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        

    },
    role:{
        type:String,
        default:"user",
        required:true,
    },
    addresses:{
        type:[Schema.Types.Mixed],
        
    },
    name:{
        type:String,

    },
    // orders:{
    //     type:[Schema.Types.Mixed]
    // }
    resetPasswordToken:{
        type:String,
        default:''
    }

},{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

const virtual=userSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
userSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){
         delete ret._id
    }
})

const User=mongoose.model('User',userSchema)
export default User;