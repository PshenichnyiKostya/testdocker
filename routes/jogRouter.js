const User = require('../models/User')
const Jog = require('../models/Jog')
const {Router} = require('express')
const jogRouter = Router()
const passport = require("passport");

jogRouter.post('/', passport.authenticate('jwt'), async (req, res) => {
    try {
        const {time, distance, date} = req.body
        if (!time || !distance || !date) {
            return res.status(400).json({message: "Select all data"})
        }
        const user = await User.findById(req.user)
        const jog = new Jog({
            time, distance, date, user
        })
        await jog.save()
        return res.status(200).json({message: "Jog added successfully", jog: jog})
    } catch (e) {
        return res.status(500).json({message: "Something wrong"})
    }
})

jogRouter.get('/', passport.authenticate('jwt'), async (req, res) => {
    try {
        const jogs = await Jog.find({})
        return res.status(200).json({jogs: jogs})
    } catch (e) {
        return res.status(500).json({message: "Something wrong"})
    }
})

jogRouter.put('/', passport.authenticate('jwt'), async (req, res) => {
    try {
        const {time, distance, date} = req.body
        console.log(time, distance, date)
        if (!time || !distance || !date) {
            return res.status(400).json({message: "Select all data"})
        } else {
            const jog = await Jog.findOneAndUpdate(req.body.jogId, {time, distance, date}, {new: true})
            console.log(jog)
            return res.status(200).json({message: "Jog updated successfully", jog: jog})
        }

    } catch (e) {
        return res.status(500).json({message: "Something wrong"})
    }
})

jogRouter.delete('/', passport.authenticate('jwt'), async (req, res) => {
    try {
        const {jogId} = req.body
        if (jogId) {
            await Jog.findByIdAndRemove(jogId)
            return res.status(200).json({message: "Jog deleted successfully"})
        } else {
            return res.status(400).json({message: "Jog not found"})
        }

    } catch (e) {
        return res.status(500).json({message: "Something wrong"})
    }
})
module.exports = jogRouter