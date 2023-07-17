import User from "../models/user.model.js"


export const register = async (req, res, next) => {

    const { username, email, password, name, lastname, phone, photo = "photo.jpg" } = req.body

    let response = {
    }

    try {

        const userFound = await User.findOne({
            $or: [{ username }, { email }]
        })
        console.log(userFound)
        if (userFound) {

            response.errors = {};

            if (userFound.username === username) {
                response.errors["username"] = "username already used"
            }
            if (userFound.email === email) {
                response.errors["email"] = "email already used"
            }
        }

        if (!response?.errors || response.errors.length === 0) {
            const newUser = new User({
                username,
                email,
                password,
                name,
                lastname,
                phone,
                photo
            })
            newUser.save()
            response.data = newUser
        }

        res.json(response)


    } catch (error) {
        console.log(error)
        next(error)
    }

}