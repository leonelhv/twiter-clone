const Tweet = require('../models/tweet.model.js')

const { verifyAccessToken } = require("../libs/jwt")
const responseCustom = require("../utils/response")



const createTweet = async (req, res) => {

  const { token } = req.cookies

  if (!token) {
    return responseCustom(res, 400, { message: "token is required" })
  }

  const payload = await verifyAccessToken(token)

  if (!payload) throw new ErrorCustom(401, "token is invalid")

  const isTokenExpired = payload.exp < Math.floor(Date.now() / 1000)


  if (isTokenExpired) throw new ErrorCustom(401, "token is expired")

  const { content } = req.body

  const newTweet = new Tweet({
    content,
    userId: payload.id
  })

  const tweetSaved = await newTweet.save()

  responseCustom(res, 200, tweetSaved)
}

const deleteTweet = async (req, res) => {

  const { token } = req.cookies

  if (!token) {
    return responseCustom(res, 400, { message: "token is required" })
  }

  const payload = await verifyAccessToken(token)

  if (!payload) throw new ErrorCustom(401, "token is invalid")


  const isTokenExpired = payload.exp < Math.floor(Date.now() / 1000)

  if (isTokenExpired) throw new ErrorCustom(401, "token is expired")


  const { id } = req.params

  const belongsToUser = await Tweet.findOne({ _id: id, userId: payload.id })

  if (!belongsToUser) throw new ErrorCustom(401, "tweet does not belong to user")

  const tweetDeleted = await Tweet.findByIdAndDelete(id)

  responseCustom(res, 200, tweetDeleted)



}

const getTweets = async (req, res) => {

  const tweets = await Tweet.find().populate("userId", "username name lastname photo").sort({ createdAt: -1 })

  responseCustom(res, 200, tweets)

}

module.exports = {
  createTweet,
  deleteTweet,
  getTweets
}