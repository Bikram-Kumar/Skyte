import Contacts from "../components/Contacts";
import Messages from "../components/Messages";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function HomePage () {
    const { getAccessTokenSilently, loginWithRedirect, isLoading } = useAuth0();
    
    useEffect(() => {
        (async () => {
            if (isLoading) return;
            try {
                const token = await getAccessTokenSilently();
                if (!token) {
                    loginWithRedirect();
                    return;
                }
                axios.defaults.headers.common['authorization'] = 'Bearer ' + token;

                console.log(axios.post("http://localhost:3000/api/user/create/", {
                    name: "Skyte User",
                    email: "bik@gmail.com",
                    user_name: "tester",
                    password: "1234",
                    avatar: "Skyte User"
                }));

            } catch (err) {
                if (err.error == "login_required") {
                    loginWithRedirect();
                } else {
                    console.log(err);
                }
            }
        })();
    }, [getAccessTokenSilently, isLoading]);

    return (
        <div className="flex w-full h-screen">
            <Contacts />
            <Messages />
        </div>
        
    );
}