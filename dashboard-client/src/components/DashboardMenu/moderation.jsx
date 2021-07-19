import React from "react";
import { Formik } from "formik"


export function DashboardModeration({
history,
guildId,
user,
config,
updateMutedRole,
roles,
channels,
updateLogsChannel
}) {
    const logsChannelId = config.logsChannel ? config.logsChannel : ""
    const MutedRoleId = config.MutedRole ? config.MutedRole : ""
    return(
        <div className="moderation">
        <Formik
           initialValues={{ MutedRole: MutedRoleId }}
           onSubmit={({ MutedRole }) => {
               updateMutedRole(MutedRole) }}
           >
               {
                   (props) => (
                       <form onSubmit={props.handleSubmit}>
                           <select name="MutedRole" onChange={props.handleChange}>
                               {roles.filter(role => role.position > 0 && !role.tags).map((role) => (
                                   <option value={role.id} selected={role.id === MutedRoleId} style={{backgroundColor: "#40444B", color: "#fff"}}>{role.name}</option>
                               ))}
                           </select>
                           <button type="submit"  className="button" style={{backgroundColor: "#44B37F"}}><span>Update Muted Role</span></button>
                       </form>
                   )
               }
               </Formik>
               <Formik
        initialValues={{ logsChannel: logsChannelId }}
        onSubmit={({ logsChannel }) => { updateLogsChannel(logsChannel) }}
        >
            {
                (props) => (
                    <form onSubmit={props.handleSubmit}>
                        <select name="logsChannel" onChange={props.handleChange}>
                            {channels.filter(channel => channel.type === 0).map((channel) => (
                                <option value={channel.id} selected={channel.id === logsChannelId} style={{backgroundColor: "#40444B", color: "#fff"}}>{channel.name}</option>
                            ))}
                        </select>
                        <button type="submit" className="button" style={{backgroundColor: "#44B37F"}}><span>Update Logs Channel</span></button>
                    </form>
                )
            }
            </Formik>
               </div>
    )
}
