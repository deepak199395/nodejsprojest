import mongoose from "mongoose"

const userSchmema= mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    lastname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    image:{
        type: String,  
        required: false
    }

}, { timestamps: true })

export default mongoose.model("users",userSchmema)