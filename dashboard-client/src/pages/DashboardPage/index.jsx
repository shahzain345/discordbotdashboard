import React from 'react';
import { getGuildChannels, getGuildConfig, getUserDetails, getGuildRoles, updateJoinRole } from '../../utils/api';
import { Formik } from "formik"
import { DashboardJoinRole, DashboardMenu, DashboardWelcomeChannel, DashboardModeration } from '../../components';
import { DashboardWelcome } from '../../components/DashboardMenu/welcome'
import { updateGuildPrefix } from '../../utils/api';
import { updateWelcomeMsg, updateWelcomeChannel, updateMutedRole, updateLogsChannel, resetWelcomeChannel } from '../../utils/api'

export function DashboardPage( {
    history,
    match,
} ) {
    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = React.useState(true);
    const [config, setConfig] = React.useState({})
    const [channels, setChannels] = React.useState([])
    const [roles, setRoles] = React.useState([])

    React.useEffect(() =>{
        getUserDetails()
        .then( ( { data } ) => {
            console.log(data)
            setUser(data)
            return getGuildConfig(match.params.id)
        }).then(({ data }) => {
            console.log(data)
            setConfig(data)
            //setLoading(false)
            return getGuildChannels(match.params.id)
        }).then(({ data }) => {
            console.log(data)
            setChannels(data)
            return getGuildRoles(match.params.id)
        }).then(({data}) => {
            console.log(data)
            setRoles(data)
            setLoading(false)
        })
        .catch((err) => {
            history.push('/');
            setLoading(false)
            console.log(err)
        })
    }, [])

    const updateGuildPrefixParent = async (prefix) => {
       try {
        const update = await updateGuildPrefix(match.params.id, prefix)
        console.log(update)
       } catch(err) {
           console.log(err)
       }
    }

    const updateWelcomeMsgParent = async (welcome) => {
        try {
            const update = await updateWelcomeMsg(match.params.id, welcome)
        } catch(err) {
            console.log(err)
        }
    }
    const updateWelcomeChannelParent = async (channelId) => {
        try {
        console.log(channelId)
        updateWelcomeChannel(match.params.id, channelId)
        } catch(err) {
            console.log(err)
        }
    }
    const updateJoinRoleParent = async (channelId) => {
        try {
        console.log(channelId)
        updateJoinRole(match.params.id, channelId)
        } catch(err) {
            console.log(err)
        }
    }
    const updateMutedRoleParent = async (channelId) => {
        try {
        console.log(channelId)
        updateMutedRole(match.params.id, channelId)
        } catch(err) {
            console.log(err)
        }
    }
    const updateLogsChannelParent = async (channelId) => {
        try {
            console.log(channelId)
            updateLogsChannel(match.params.id , channelId)
        } catch(err) {
            console.log(err)
        }
    }
    const resetWelcomeChannelParent = async () => {
        try {
            config.welcomeChannel ? resetWelcomeChannel(match.params.id) : console.log("Bad Request!");
        } catch(err) {
            console.log(err)
        }
    }

    return !loading && (
        <div>
            <h1>Dashboard Page</h1>
            <DashboardMenu user={ user } config={config} updatePrefix={ updateGuildPrefixParent }/>
            <DashboardModeration roles={roles} config={config} updateMutedRole={updateMutedRoleParent} channels={channels} updateLogsChannel={updateLogsChannelParent} />
            <DashboardWelcome user={ user } config={ config } updateWelcome={ updateWelcomeMsgParent } />
            <DashboardWelcomeChannel updateWelcomeChannel={ updateWelcomeChannelParent } channels={ channels } config={config} resetWelcomeChannel={resetWelcomeChannelParent}/>
            <DashboardJoinRole updateJoinRole={updateJoinRoleParent} config={config} roles={roles}  />
            <DashboardModeration roles={roles} config={config} updateMutedRole={updateMutedRoleParent} channels={channels} updateLogsChannel={updateLogsChannelParent} />
        </div>
    )


    }
