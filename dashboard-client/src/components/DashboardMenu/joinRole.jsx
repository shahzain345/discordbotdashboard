import React from "react";
import { Formik } from "formik"


export function DashboardJoinRole({
history, 
guildId,
user,
config,
updateJoinRole,
roles,
}) {
    const joinRoleId = config.joinRole ? config.joinRole : "";
    console.log(roles)
    return( 
           <Formik
           initialValues={{ joinRole: joinRoleId }}
           onSubmit={({ joinRole }) => {
               updateJoinRole(joinRole) }}
           >
               {
                   (props) => (
                       <form onSubmit={props.handleSubmit}>
                           <select name="joinRole" onChange={props.handleChange}>
                               {roles.filter(role => role.position > 0 && !role.tags).map((role) => (
                                   <option value={role.id} selected={role.id === joinRoleId} style={{color: role.color}}>{role.name}</option>
                               ))}
                           </select>
                           <button type="submit" children="Update Join Role!" />
                       </form>
                   )
               }
               </Formik>
       )
}