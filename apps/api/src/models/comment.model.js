const mongoose = require('mongoose')


const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        trim: true
    },
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tweet',
        required: true,
        trim: true
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Like', commentSchema)

