import React from 'react';
const login = () => window.location.href = "http://localhost:3001/api/auth/discord/redirect";

export function LandingPage( props ) {
    return <div>
        <button onClick={login}>Login with discord!</button>
        </div>

}
