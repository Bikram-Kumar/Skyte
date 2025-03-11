import Contacts from "../components/Contacts";
import Messages from "../components/Messages";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";
import axios from 'axios';

export default function HomePage () {
    const { getAccessTokenSilently, loginWithRedirect, isLoading, user } = useAuth0();
    
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

                console.log(await axios.post("http://localhost:3000/api/user/retrieve", {
                    email: "bikram@gmail.com",
                }));
                console.log(user.email);

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