const mongoose = require('mongoose')


const tweetSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    trim: true
  },
  likes: {
    type: Number,
    default: 0,
    trim: true
  },
  retweets: {
    type: Number,
    default: 0,
    trim: true
  },
  countComments: {
    type: Number,
    default: 0,
    trim: true
  },
  tweetFather: {
    type: mongoose.Schema.Types.ObjectId || null,
    default: null,
    ref: 'Tweet',
    trim: true
  }
},
  {
    timestamps: true
  })

module.exports = mongoose.model('Tweet', tweetSchema)

