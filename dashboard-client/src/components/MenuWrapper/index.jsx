import React from 'react';
import { Link } from 'react-router-dom';


export function MenuComponent( {
    guilds,
} ) {
    return (
        <div>
        {guilds.included.map((guild) => (
            <div>
            <p className="guildNameIncluded" style={{color: "#fff",  fontSize: "15px"}}><strong>{guild.name}</strong></p>
            <button className="button" style={{backgroundColor: "#44B37F"}}><a href={`/dashboard/${guild.id}`} style={{color: "#fff"}}><span><strong>View Dashboard</strong></span></a></button>
            </div>
        ))}
        {guilds.excluded.map((guild) => (
          <div className="guildInfoExc">
            <li className="guildNameExcluded" style={{color: '#fff'}}>{guild.name}</li>
            <button className="button" style={{backgroundColor: "red", fontSize: "15px"}}><a href={`https://discord.com/oauth2/authorize?client_id=771714285575077908&scope=bot&permissions=2146958847&guild_id=${guild.id}`} style={{color: "#fff"}}><span>Setup Bot</span></a></button>
          </div>
        ))}
        </div>
    )
    }
