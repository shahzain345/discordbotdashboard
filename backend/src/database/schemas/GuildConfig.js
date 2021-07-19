const mongoose = require('mongoose');

const GuildConfigSchema = new mongoose.Schema( { 
    guildId: { 
        type: mongoose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "YOUR_DEFAULT_PREFIX_HERE",
    },
    defaultRole: { 
        type: mongoose.SchemaTypes.String, 
        required: false,
    },
    memberLogChannel: {
        type: mongoose.SchemaTypes.String, 
        required: false,
    },
    welcomeMsg: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: "hello",
    },
    welcomeChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    joinRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    MutedRole: {
        type: mongoose.SchemaTypes.String,
        required: false,
    },
    logsChannel: {
        type: mongoose.SchemaTypes.String,
        required: false,
    }
})

module.exports = mongoose.model('GuildConfig', GuildConfigSchema)