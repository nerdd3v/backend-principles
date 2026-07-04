import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age:{
        type: Number,
        require: true
    }
})

const userModel =  mongoose.model("user", userSchema);


export default userModel;