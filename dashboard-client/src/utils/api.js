import axios from "axios";

export function getUserDetails() {
    return axios.get('http://localhost:3001/api/auth', {
        withCredentials: true })
}

export function getGuilds() {
    return axios.get('http://localhost:3001/api/discord/guilds', {
        withCredentials: true })
}

export function getGuildConfig(guildId) {
    return axios.get(`http://localhost:3001/api/discord/guilds/${guildId}/config`, {
        withCredentials: true })
}

export function updateGuildPrefix(guildId, prefix) {
    return axios.put(`http://localhost:3001/api/discord/guilds/${guildId}/prefix`, {
        prefix
}, {
withCredentials: true })
}

export function updateWelcomeMsg(guildId, welcomeMsg) {
    return axios.put(`http://localhost:3001/api/discord/guilds/${guildId}/welcome`, {
        welcomeMsg
    }, {
        withCredentials: true })
}
export function updateWelcomeChannel(guildId, welcomeChannel) {
    return axios.put(`http://localhost:3001/api/discord/guilds/${guildId}/channels/welcomechannel`, {
        welcomeChannel
    }, {
        withCredentials: true,
    })
}
export function getGuildChannels(guildId) {
    return axios.get(`http://localhost:3001/api/discord/guilds/${guildId}/channels`, {
        withCredentials: true,
    })
}
export function getGuildRoles(guildId) {
    return axios.get(`http://localhost:3001/api/discord/guilds/${guildId}/roles`, {
        withCredentials: true,
    })
}
export function updateJoinRole(guildId, joinRole) {
    return axios.put(`http://localhost:3001/api/discord/guilds/${guildId}/roles/joinrole`, {
        joinRole
    },{
        withCredentials: true,
    })
}
export function updateMutedRole(guildId, MutedRole) {
    return axios.put(`http://localhost:3001/api/discord/guilds/${guildId}/roles/mutedrole`, {
        MutedRole
    },{
        withCredentials: true,
    })
}
export function updateLogsChannel(guildId, logsChannel) {
    return axios.put(`http://localhost:3001/api/discord/guilds/${guildId}/channels/logschannel`, {
        logsChannel
    }, {
        withCredentials: true,
    })
}

export function resetWelcomeChannel(guildId) {
    return axios.put(`http://localhost:3001/api/discord/guilds/${guildId}/channels/resetwelcomechannel`, {
        withCredentials: true
    })
}
export function checkGuildPermissions(guildId, userId) {
  return axios.get(`http://localhost:3001/api/discord/guilds/${guildId}/permissions/${userId}`)
}
