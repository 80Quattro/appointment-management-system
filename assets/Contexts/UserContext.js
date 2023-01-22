import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {

    const [contextState, setContextState] = useState({
        isLoggedIn: false,
        userName: null,
        token: null,
        roles: []
    });

    const checkIfLoggedIn = () => {
        let token = localStorage.getItem('token');
        if(token !== null) {
            onLogin(token);
        }
    }

    const onLogin = (token) => {
        // token decode
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        let decoded = JSON.parse(jsonPayload);

        localStorage.setItem('token', token);

        setContextState({
            isLoggedIn: true,
            userName: decoded.username,
            token: token,
            roles: decoded.roles
        });
    }

    const onLogOut = () => {

        localStorage.removeItem('token');

        setContextState({
            isLoggedIn: false,
            userName: null,
            token: null,
            roles: []
        });
    }

    return (
        <UserContext.Provider 
            value={{
                isLoggedIn: contextState.isLoggedIn,
                userName: contextState.userName,
                token: contextState.token,
                roles: contextState.roles,
                onLogin,
                onLogOut,
                checkIfLoggedIn
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}