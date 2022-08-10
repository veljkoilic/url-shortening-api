const mongoose = require('mongoose')

const urlSchema = mongoose.Schema({
    url:{
        type: String,
        required: [true, "Please add a URL."],
        unique: true,
    },
    path:{
        type: String,
        required: [true, "Please add a path."],
        unique: true,
    },
    clicked:{
        type: Number,
        default: 0
    },
    createdAt:{
        type: Date,
        expires: '5m',
        default: Date.now
    }
},{
    timestamps:true
})
module.exports = mongoose.model("Url", urlSchema)