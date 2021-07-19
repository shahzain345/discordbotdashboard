import React from 'react';
import { MenuComponent } from '../../components';


import { getGuilds, getUserDetails } from '../../utils/api';

export function MenuPage( {
    history,
} ) {

    const [user, setUser] = React.useState(null)
    const [loading, setLoading] = React.useState(true);
    const [guilds, setGuilds ] = React.useState( [] )

    React.useEffect(() =>{
        getUserDetails()
        .then( ( { data } ) => {
            console.log(data)
            setUser(data)
            return getGuilds()
        }).then( ( { data } ) => {
            console.log(data)
            setGuilds(data)
            setLoading( false )
        }).catch((err) => {
            history.push('/');
            setLoading(false)
            console.log(err)
        })
    }, [])

    return !loading && (
        <div>
        <h1>Select a server!</h1>
          <MenuComponent guilds={guilds} user={user} />
        </div>
    )

    }
