import mongoose from "mongoose";

const brandSchema=new mongoose.Schema({

    value:{
        type:String,
        required:true,
        unique:true,
    },
    label:{
        type:String,
        required:true,
        unique:true,

    },
    checked:{
        type:Boolean,
        default:false,
    }

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
})

const virtual=brandSchema.virtual('id');
virtual.get(function(){
    return this._id;
})
brandSchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){
         delete ret._id
    }
})

const Brand=mongoose.model('Brand',brandSchema)
export default Brand;