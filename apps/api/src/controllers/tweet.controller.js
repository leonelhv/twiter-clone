const Tweet = require('../models/tweet.model.js')
const User = require('../models/user.model.js')
const Like = require('../models/like.model.js')
const responseCustom = require("../utils/response")
const { ErrorCustom } = require("../utils/ErrorCustom")




const createTweet = async (req, res) => {

    const { content } = req.body
    const { user } = req

    const userData = await User.findById(user.id)

    const newTweet = new Tweet({
        content,
        userId: userData
    })

    const tweetSaved = await newTweet.save()

    responseCustom(res, 200, tweetSaved)
}

const deleteTweet = async (req, res) => {


    const { user } = req
    const { id } = req.params
    const belongsToUser = await Tweet.findOne({ _id: id, userId: user.id })

    if (!belongsToUser) throw new ErrorCustom(401, "tweet does not belong to user")

    const tweetDeleted = await Tweet.findByIdAndDelete(id)

    responseCustom(res, 200, tweetDeleted)



}

const getTweets = async (req, res) => {

    const { user } = req

    const tweets = await Tweet.find().populate("userId", "username name lastname photo").sort({ createdAt: -1 })
    if (!user.id) {
        return responseCustom(res, 200, tweets)
    } else {
        const TweetsWithLike = await Promise.all(tweets.map(async (tweet) => {


            const like = await Like.findOne({ userId: user.id, tweetId: tweet._id })

            if (like) {
                return {
                    ...tweet._doc,
                    liked: true
                }
            } else {
                return {
                    ...tweet._doc,
                    liked: false
                }
            }
        }))

        return responseCustom(res, 200, TweetsWithLike)
    }





}

const likeToTweet = async (req, res) => {

    const { id } = req.user
    const { idTweet } = req.body

    const tweet = await Tweet.findById(idTweet)


    if (!tweet) throw new ErrorCustom(404, "Tweet not found")

    const like = await Like.findOne({ userId: id, tweetId: idTweet })


    if (like) {
        await Like.findByIdAndDelete(like._id)
        tweet.likes -= 1
        await tweet.save()
        const tweetResponse = {
            likes: tweet._doc.likes,
            liked: false
        }
        responseCustom(res, 200, tweetResponse)
        return
    } else {
        const newLike = new Like({
            userId: id,
            tweetId: idTweet
        })
        await newLike.save()
        tweet.likes += 1
        await tweet.save()
        const tweetResponse = {
            likes: tweet._doc.likes,
            liked: true
        }
        responseCustom(res, 200, tweetResponse)
        return
    }
}
module.exports = {
    createTweet,
    deleteTweet,
    getTweets,
    likeToTweet
}