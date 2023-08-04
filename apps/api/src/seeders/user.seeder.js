const { faker } = require('@faker-js/faker');
const { UniqueEnforcer } = require('enforce-unique');
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const foundPathImage = require('../utils/foundPathImage.js');

const maxCant = 100;

async function createUserTest () {

  const hashPassword = await bcrypt.hash("123456", 10)
  const photo = await foundPathImage()

  const userTest = {
    username: "test",
    email: "test@gmail.com",
    password: hashPassword,
    name: "test",
    lastname: "test",
    phone: "123456789",
    photo
  }
  return userTest
}

const seedUsers = async (req, res) => {
  try {
    const cant = req.query.cant || 20;

    if (cant > maxCant) {
      return res.status(400).json({ message: `Max cant is ${maxCant}` });
    }

    await User.deleteMany();

    const USERS = await usersFake(cant);

    await User.insertMany(USERS);

    const userTest = await createUserTest()

    await User.create(userTest);

    res.json({ message: 'Users seeder successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error seeding users', error });
  }
}

async function createRandomUsers () {
  return new Promise(async (resolve) => {
    const uniqueEnforce = new UniqueEnforcer();
    const username = uniqueEnforce.enforce(() => {
      return faker.internet.userName()
    });
    const email = uniqueEnforce.enforce(() => {
      return faker.internet.email()
    });
    const password = await bcrypt.hash("123456", 10)
    const name = faker.person.firstName()
    const lastname = faker.person.lastName()
    const phone = faker.phone.number("#########")

    const photo = await foundPathImage()


    resolve({
      username: username.replace(/\./g, '_'),
      email,
      password,
      name,
      lastname,
      phone,
      photo
    });
  });
}

async function usersFake (cant) {
  const promises = Array.from({ length: cant }, () => createRandomUsers());
  return Promise.all(promises);
}

module.exports = seedUsers;
