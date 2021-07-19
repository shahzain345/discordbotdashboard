import React from "react";
import { Formik } from "formik"


export function DashboardWelcome({
history, 
guildId,
user,
config,
updateWelcome,
}) { 
    return ( 
        <Formik
            initialValues={{ welcomeMsg: config.welcome, }}
            onSubmit={({ welcomeMsg }) => {
               updateWelcome(welcomeMsg)
               alert("Saved Changes")
            }}
            >
                {
                    (props) => (
                        <form onSubmit={props.handleSubmit}>
                            <input type="text" name="welcomeMsg" onChange={props.handleChange} defaultValue={config.welcomeMsg} />
                            <button type="submit">Update Welcome Message</button>
                        </form>
                    )
                }
                
            </Formik>
    )
}

