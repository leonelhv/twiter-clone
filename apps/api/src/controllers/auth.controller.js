const bcrypt = require("bcryptjs");
const User = require("../models/user.model.js");
const responseCustom = require("../utils/response.js");
const { createAccessToken } = require("../libs/jwt.js");
const { ErrorCustom } = require("../utils/ErrorCustom.js");
const randomRange = require("../utils/randomRange.js");


const register = async (req, res) => {

    const { username, email, password, name, lastname, phone, photo = "photo.jpg" } = req.body

    const errors = {};

    const userFound = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (userFound) {
        if (userFound.username === username) {
            errors["username"] = "username already used"
        }
        if (userFound.email === email) {
            errors["email"] = "email already used"
        }
    }

    if (Object.keys(errors).length > 0) {
        return responseCustom(res, 400, errors);
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const randomNumber = randomRange(1, 3)

    const newUser = new User({
        username,
        email,
        password: passwordHash,
        name,
        lastname,
        phone,
        photo: `assets/${randomNumber}.png`
    })

    const userSaved = await newUser.save();

    const token = await createAccessToken({
        id: userSaved._id,
    });

    res.cookie("token", token, {
        httpOnly: process.env.NODE_ENV !== "development",
        secure: true,
        sameSite: "none",
    });

    return responseCustom(res, 200, {
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email

    });
}

const login = async (req, res) => {

    const { email, password } = req.body

    const userFound = await User.findOne({ email })
    const isMatch = await bcrypt.compare(password, userFound.password)

    if (!userFound || !isMatch) throw new ErrorCustom("Invalid Credentials", 401)


    const token = await createAccessToken({ id: userFound._id })


    res.cookie('token', token)

    responseCustom(res, 200, {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
    })

}

module.exports = {
    register,
    login
}