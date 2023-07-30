const { faker } = require('@faker-js/faker');
const Tweet = require("../models/tweet.model.js");
const User = require("../models/user.model.js");



const maxCant = 100;

const seedTweets = async (req, res) => {
  try {
    const cant = req.query.cant || 20;

    if (cant > maxCant) {
      return res.status(400).json({ message: `Max cant is ${maxCant}` });
    }


    await Tweet.deleteMany();

    const TWEETS = await tweetFake(cant);
    await Tweet.insertMany(TWEETS);

    res.json({ message: 'Tweet seeder successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding tweetss', error });
  }
}

async function createTweet () {
  return new Promise(async (resolve) => {

    const randomIdUser = await User.find().select('_id')
    const idsUsers = randomIdUser.map((usuario) => usuario._id);
    const usersCant = idsUsers.length
    const randomUser = Math.floor(Math.random() * usersCant)

    const content = faker.lorem.paragraph()
    resolve({
      content,
      userId: idsUsers[randomUser]
    });
  });
}

async function tweetFake (cant) {
  const promises = Array.from({ length: cant }, () => createTweet());
  return Promise.all(promises);
}




module.exports = seedTweets;
