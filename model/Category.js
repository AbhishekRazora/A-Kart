import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({

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

const virtual=categorySchema.virtual('id');
virtual.get(function(){
    return this._id;
})
categorySchema.set('toJSON',{
    virtuals:true,
    versionKey:false,
    transform:function(doc,ret){
         delete ret._id
    }
})

const Category=mongoose.model('Category',categorySchema)
export default Category;