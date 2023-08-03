const Tweet = require("../models/tweet.model.js");
const User = require("../models/user.model.js");
const responseCustom = require("../utils/response.js");

const getInfoUser = async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username }).select("-password -email -phone -updatedAt -__v").lean();

  if (!user) {
    return responseCustom(res, 404, {
      message: "User not found"
    });
  }

  const tweets = await Tweet.find({ userId: user._id, tweetFather: null }).select("-__v").lean();

  return responseCustom(res, 200, {
    user,
    tweets
  });
}


module.exports = {
  getInfoUser
}