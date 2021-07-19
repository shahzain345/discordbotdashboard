require('dotenv').config();
require('./startagies/discord');

const express = require('express')
const passport = require('passport')
const app = express();
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3002;
const session = require('express-session');
const cors = require('cors')
const Store = require('connect-mongo')(session);

const routes = require("./routes")

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use( cors ({
    origin: ['http://localhost:3000'],
    credentials: true,
}))
const path = require('path');


app.use( session({
    secret: 'secret',
    cookie: {
        maxAge: 60000 * 60 * 24
    },
    resave: false,
    saveUninitialized: false,
    store: new Store({mongooseConnection: mongoose.connection })
}))

app.use( passport.initialize() );
app.use( passport.session() );

app.use('/api', routes );

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
