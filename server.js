const express = require('express')
const mongoose = require('mongoose')
const passport = require("passport");
const configurePassport = require("./middlewares/passport")
const bodyParser = require('body-parser')
const authRouter = require('./routes/authRouter')
const jogRouter = require('./routes/jogRouter')

configurePassport(passport)
const app = express()

app.use(bodyParser.json());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.get('/', (req, res) => {
    res.send('Hello World');
});
app.use('/v1/auth/', authRouter)
app.use('/v1/data/jog/', jogRouter)

async function start() {
    try {
        await mongoose.connect("mongodb+srv://kostya:123@jog-4efdr.mongodb.net/jog?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        app.listen(5000), () => console.log('Server start')

    } catch (e) {
        console.error(e.message)
        process.exit(1)
    }
}

start()

