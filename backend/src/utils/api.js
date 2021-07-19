const fetch = require('node-fetch');
const TOKEN = process.env.DASHBOARD_BOT_TOKEN
async function getBotGuilds() {
const response = await fetch('http://discord.com/api/v8/users/@me/guilds', {
    method: 'GET',
    headers: {
        Authorization: `Bot ${TOKEN}`,
    }
})
return response.json();
}
async function getGuildChannels(guildId) {
    const response = await fetch(`http://discord.com/api/v8/guilds/${guildId}/channels`, {
        method: 'GET',
        headers: {
            Authorization: `Bot ${TOKEN}`,
        }
    })
    return response.json();
    }
    async function getGuildRoles(guildId) {
        const response = await fetch(`http://discord.com/api/v8/guilds/${guildId}/roles`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${TOKEN}`,
            }
        })
        return response.json();
    }
    async function getUserPermissions(guildId, userId) {
        const response = await fetch(`http://discord.com/api/v8/guilds/${guildId}/members/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bot ${TOKEN}`,
            }
        })
        return response.json();
    }

module.exports = { getBotGuilds, getGuildChannels, getGuildRoles, getUserPermissions }
