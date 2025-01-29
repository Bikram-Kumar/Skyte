import Contacts from "../components/Contacts";
import Messages from "../components/Messages";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";

export default function HomePage () {
    var [token, setToken] = useState(6);
    const { getAccessTokenSilently, loginWithRedirect, isLoading } = useAuth0();
    useEffect(() => {
        (async () => {
            if (isLoading) return;
            try {
                setToken(await getAccessTokenSilently());
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