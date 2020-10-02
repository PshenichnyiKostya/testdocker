const {Router} = require('express')
const passport = require("passport");
const User = require('../models/User')
const authRouter = Router()
const jwt = require('jsonwebtoken')
const config = require('config')

authRouter.post('/login', async (req, res) => {

    try {
        await passport.authenticate("local", function (err, user, message) {
            if (user === false) {
                return res.status(400).json({message: "Такого пользователя не существует("})
            } else {
                const payload = {
                    id: user._id,
                    firstName: user.firstName,
                    role: user.role,
                    email: user.email
                }
                const token = jwt.sign(payload, config.get('secret'), {
                    expiresIn: "7d"
                })
                return res.status(200).json({userInfo: payload, token, message})
            }
        })(req)
    } catch (e) {
        return res.status(500).json({message: "Something wrong "})
    }

    // const {email, password} = req.body
    // console.log(req.user)
    // await User.findOne({email}).then(user => {
    //     if (user?.checkPassword(password)) {
    //         const payload = {
    //             id: user._id,
    //             role: user.type,
    //             email: user.email,
    //             phone: user.phone,
    //         }
    //         const token = jwt.sign(payload, config.get('secret'), {
    //             expiresIn: "7d"
    //         })
    //         return res.status(200).json({userInfo: payload, token})
    //     } else {
    //         return res.status(400).json({message: "Пользователь не найден"})
    //     }
    // })

})

authRouter.post('/register', async (req, res) => {

    // const {email, password, role = "User", firstName, phone} = req.body
    const email = 'qwerty@bk.ru'
    const password = '1234567'
    const role = 'User'
    const firstName = 'Kostya'
    const phone = '+375447433916'

    const newUser = new User({
        email,
        role,
        password,
        firstName,
        phone
    })
    const savedUser = await newUser.save()
    const payload = {
        id: savedUser._id,
        role: savedUser.type,
        email: savedUser.email,
        phone: savedUser.phone,
    }
    const token = jwt.sign(payload, config.get('secret'), {
        expiresIn: "7d"
    })
    return res.status(201).json({message: "Вы успешно зарегистрированы!", userInfo: payload, token})
})

module.exports = authRouter