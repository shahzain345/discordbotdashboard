const passport = require('passport');
const DiscordStartegy = require('passport-discord')
const User = require('../database/schemas/user')
const OAuth2Credentials = require('../database/schemas/OAuth2Credantials')
const { encrypt } = require('../utils/utils');
const e = require('express');

passport.serializeUser((user, done) =>{
    done(null, user.discordId)
})

passport.deserializeUser(async (discordId, done) => {
    try{
        const user= await User.findOne({ discordId })
        return user ? done(null, user) : done(null, null)
    } catch (err) {
        console.log(err)
        done(err, null);
    }
})

passport.use(
    new DiscordStartegy ({
    clientID: process.env.DASHBOARD_CLIENT_ID,
    clientSecret: process.env.DASHBOARD_CLIENT_SECRET,
    callbackURL: process.env.DASHBOARD_CALLBACK_URL,
    scope: ['identify', 'guilds'],
}, async (accessToken, refreshToken, profile, done) => {
    const {id, username, discriminator, avatar, guilds} = profile
    console.log(id, username, discriminator, avatar, guilds)
    try {
    const findUser = await User.findOneAndUpdate({ discordId: id }, {
        discordTag: `${username}#${discriminator}`,
        avatar,
        guilds,
    }, {new: true});
    if (findUser) {
        console.log('User was found!')
        return done(null, findUser)
    } else {
        const newUser = await User.create({
            discordId: id,
            discordTag: `${username}#${discriminator}`,
            avatar,
            guilds,
        });
        return done(null, newUser)
    }
} catch (err) {
    console.log(err);
    return done(err, null)
}
})

)
