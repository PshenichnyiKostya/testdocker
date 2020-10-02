const {model, Schema} = require('mongoose')


const Jog = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    date: {type: Date, default: new Date()},
    distance: {type: Number, default: 0},
    time: {type: Number, default: 0},
})

module.exports = model('Jog', Jog)