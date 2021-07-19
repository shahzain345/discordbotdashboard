function getMutualGuilds(userGuilds, botGuilds){

 // return userGuilds.filter((guild) => botGuilds.find((botGuild) => (botGuild.id === guild.id) && (guild.permissions & 0x20) === 0x20))
 const validGuilds = userGuilds.filter((guild) => (guild.permissions & 0x20) === 0x20)
 const included = [];
 const excluded = validGuilds.filter((guild) => {
     const findguild = botGuilds.find((g) => g.id === guild.id)
     if (!findguild) return guild;
     included.push(findguild)
 })
 return { excluded, included }
}

module.exports = { getMutualGuilds }