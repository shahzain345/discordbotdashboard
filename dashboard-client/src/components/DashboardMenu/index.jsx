import React from "react";
import { Formik } from "formik"


export function DashboardMenu({
history,
guildId,
user,
config,
updatePrefix,
}) {
    return(
        <Formik
            initialValues={{ prefix: config.prefix }}
            onSubmit={({ prefix }) => {
               updatePrefix(prefix)
            }}
            >
                {
                    (props) => (
                        <form onSubmit={props.handleSubmit}>
                            <input type="text" name="prefix" onChange={props.handleChange} defaultValue={config.prefix} style={{height: "35px", backgroundColor: "#40444B", color: "#fff"}}/>
                            <button type="submit" className="button" style={{backgroundColor: "#44B37F", color: "#fff"}}><span>Update prefix</span></button>
                        </form>
                    )
                }
            </Formik>
    )
}
