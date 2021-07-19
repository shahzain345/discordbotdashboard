import React from "react";
import { Formik } from "formik"


export function DashboardWelcomeChannel({
history, 
guildId,
user,
config,
updateWelcomeChannel,
channels,
resetWelcomeChannel,
}) { 
    const welcomeChannelId = config.welcomeChannel ? config.welcomeChannel : "";
 return( 
        <Formik
        initialValues={{ welcomeChannel: welcomeChannelId }}
        onSubmit={({ welcomeChannel }) => {
            updateWelcomeChannel(welcomeChannel)
            alert("Saved Changes"); }}
        onReset={({ welcomeChannel }) => {
            resetWelcomeChannel(welcomeChannel)
        }}
        >
            {
                (props) => (
                    <form onSubmit={props.handleSubmit} onReset={props.handleReset}>
                        <select name="welcomeChannel" onChange={props.handleChange} onReset={props.handleReset}>
                            {channels.filter(channel => channel.type === 0).map((channel) => (
                                <option value={channel.id} selected={channel.id === welcomeChannelId} >{channel.name}</option>
                            ))}
                        </select>
                        <button type= "submit" children="Update Welcome Channel" /> 
                        <button type= "reset" children= "Reset Welcome Channel" />
                    </form>
                )
            }
            </Formik>
    )
}

