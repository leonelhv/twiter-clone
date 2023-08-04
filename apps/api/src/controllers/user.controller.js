const Tweet = require("../models/tweet.model.js");
const User = require("../models/user.model.js");
const Like = require("../models/like.model.js");
const responseCustom = require("../utils/response.js");

const getInfoUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-password -email -phone -updatedAt -__v").lean();

  if (!user) {
    return responseCustom(res, 404, {
      message: "User not found"
    });
  }

  const tweets = await Tweet.find({ userId: user._id, tweetFather: null }).populate("userId", "username name lastname photo").select("-__v").lean();

  return responseCustom(res, 200, {
    user,
    tweets
  });
}

const getRepliesUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-password -email -phone -updatedAt -__v").lean();

  if (!user) {
    return responseCustom(res, 404, {
      message: "User not found"
    });
  }

  const tweets = await Tweet.find({ userId: user._id, tweetFather: { $ne: null } })
    .populate("userId", "username name lastname photo")
    .select("-__v")
    .lean();

  return responseCustom(res, 200, tweets);
}

const getLikesUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-password -email -phone -updatedAt -__v").lean();

  if (!user) {
    return responseCustom(res, 404, {
      message: "User not found"
    });
  }
  const tweets = await Like.find({ userId: user._id })
    .populate({
      path: "tweetId",
      select: "-__v -createdAt -updatedAt",
      populate: {
        path: "userId",
        select: "username name lastname photo",
      },
    })
    .select("-__v -createdAt -updatedAt -userId -_id")
    .lean();

  const tweetObjects = tweets.map(({ tweetId }) => ({ ...tweetId, liked: true }));

  return responseCustom(res, 200, tweetObjects);
}

module.exports = {
  getInfoUser,
  getRepliesUser,
  getLikesUser
}