const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: Object,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    // isAcess:{
    //     type: Boolean,
    //     default:false
    // }
    // ,
    tokens: [
        {
            token:{
                type: String,
                required:true
            }
        }
    ]
}, {
    timestamps: true
})


userSchema.pre('save',async function (next){
    try {
       if(this.isModified('password')) {
           this.password=await bcrypt.hash(this.password,12)
           
       }
       next()
    } catch (error) {
        
    }
})

userSchema.pre('findOneAndUpdate',async function (next){

    try {
        const userToUpdate = await this.model.findOne(this.getQuery())

        if (userToUpdate.password !== this._update.password) {
          this._update.password = await bcrypt.hash(this._update.password, 12)
        }
       next()
    } catch (error) {
        
    }
})



userSchema.methods.generateToken = async function (user){
    // console.log(user)
    try {
        // console.log(process.env.SECRET_JWT_KEY)
        let myToken=jwt.sign({_id:this._id,role:user._id},process.env.SECRET_JWT_KEY)
        this.tokens=this.tokens.concat({token:myToken})
        await this.save()
        return myToken
        
    } catch (error) {
        console.log(error)
    }
}


const model = mongoose.model("user", userSchema);
module.exports = model;