const router = require("express").Router();
const { getBotGuilds, getGuildChannels, getGuildRoles, getUserPermissions } = require('../utils/api')
const User = require('../database/schemas/user')
const { getMutualGuilds } = require('../utils/utils')
const GuildConfig = require('../database/schemas/GuildConfig')

router.get("/guilds", async (req, res) => {
    const user = await User.findOne({ discordId: req.user.discordId })
    const guilds = await getBotGuilds()
    if (user) {
        const userGuilds = user.get('guilds')
        const mutualGuilds = getMutualGuilds(userGuilds, guilds)
        res.send(mutualGuilds);
    }else {
        return res.status(401).send({ msg: "Unauthorized :("})
    }
})

router.put('/guilds/:guildId/prefix', async (req, res) => {
    const { prefix } = req.body
    const { guildId } = req.params
    if (!prefix) return res.status(400).send({ msg: "prefix required"})
    const update = await GuildConfig.findOneAndUpdate({ guildId }, { prefix }, {new: true})
    return update ? res.send(update) : res.status(400).send({ msg: 'Could not find document'})
})

router.put('/guilds/:guildId/welcome', async (req, res) => {
    const { welcomeMsg } = req.body;
    const { guildId } = req.params
    if (!welcomeMsg) return res.status(400).send({ msg: "Welcome required"})
    const update = await GuildConfig.findOneAndUpdate({ guildId }, { welcomeMsg }, { new: true })
    return update ? res.send(update) : res.status(400).send({ msg: 'could not find document'})
})

router.get('/guilds/:guildId/config', async (req, res) => {
    const { guildId } = req.params;
    const config = await GuildConfig.findOne({ guildId })
    return config ? res.send(config) : res.status(404).send({ msg: "Not found :("})
})

router.get('/guilds/:guildId/roles', async (req, res) => {
    const { guildId } = req.params;
    try {
    const roles = await getGuildRoles(guildId)
    res.send(roles);
    } catch(err) {
        console.log(err)
        res.status(500).send({msg: "Backend error"});
    }
});

router.get('/guilds/:guildId/channels', async (req, res) => {
    const { guildId } = req.params;
    try {
    const channels = await getGuildChannels(guildId)
    res.send(channels);
    } catch(err) {
        console.log(err)
        res.status(500).send({msg: "Backend error"});
    }
});

router.put('/guilds/:guildId/channels/welcomechannel', async (req, res) => {
    const { welcomeChannel } = req.body;
    if (!welcomeChannel) return res.status(400).send({ msg: "Bad Request Channel id not provided"})
    const { guildId } = req.params;
    try {
    const update = await GuildConfig.findOneAndUpdate({ guildId }, { welcomeChannel }, { new: true })
    return update ? res.send(update) : res.status(400).send({ msg: "Bad Request. ChannelId was provided" });
    } catch(err) {
        console.log(err);
        res.status(500).send( { msg: "Backend error" } );
    }
})

router.put('/guilds/:guildId/roles/joinrole', async (req, res) => {
    const { joinRole } = req.body;
    if (!joinRole) return res.status(400).send({ msg: "Bad Request role id not provided!" })
    const { guildId } = req.params;
    try {
        const update = await GuildConfig.findOneAndUpdate({ guildId }, { joinRole }, { new: true })
        return update ? res.send(update) : res.status(400).send({ msg: "Bad Request!" })
    } catch(err) {
        console.log(err)
        res.status(500).send({ msg: "Backend error! "})
    }
})
router.put('/guilds/:guildId/roles/mutedrole', async (req, res) => {
    const { MutedRole } = req.body;
    if (!MutedRole) return res.status(400).send({ msg: "Bad Request Role Id not provided!" })
    const { guildId } = req.params
    try {
        const update = await GuildConfig.findOneAndUpdate({ guildId }, { MutedRole }, { new: true })
        return update ? res.send(update) : res.status(400).send({ msg: "Bad Request!" })
    } catch(err) {
        console.log(err)
        res.status(500).send({ msg: "Backend Error" })
    }
})

router.put('/guilds/:guildId/channels/logschannel', async (req, res) => {
    const { logsChannel } = req.body;
    if(!logsChannel) return res.status(400).send({ msg: "Bad request " })
    const { guildId } = req.params
    try {
        const update = await GuildConfig.findOneAndUpdate({ guildId }, { logsChannel }, { new: true })
        return update ? res.send(update) : res.status(400).send({ msg: "Bad Request!" })
    } catch(err) {
        console.log(err)
        res.status(500).send({ msg: "Backend Error" })
    }
})

router.put('/guilds/:guildId/channels/resetwelcomechannel', async (req, res) => {
    const { guildId } = req.params
    const { welcomeChannel } = GuildConfig.findOne({ guildId, welcomeChannel })
    try {
        const update = await GuildConfig.findOneAndDelete({ guildId }, { welcomeChannel }, { new: true })
        return update ? res.send(update) : res.status(400).send({ msg: "Bad Request!" })
    } catch(err) {
        console.log(err)
        res.status(500).send({ msg: "Backend Error" })
    }
})

router.get('/guilds/:guildId/permissions/:userId', async (req, res) => {
  const  guildId  = req.params.guildId;
  const userId  = req.params.userId
  const reponse = await getUserPermissions(guildId, userId)
  return res.send(response)
})

module.exports = router;
