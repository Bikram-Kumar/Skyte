import Contacts from "../components/Contacts";
import Messages from "../components/Messages";
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { CreateAccountPage } from "./CreateAccountPage";
import { MainPage } from "./MainPage";

export default function HomePage () {
    const { getAccessTokenSilently, loginWithRedirect, isLoading, user } = useAuth0();
    const [content, setContent] = useState(<MainPage />);
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
                const userDetails = await axios.get("http://localhost:3000/api/user/retrieve?email=" + user.email);
                if (userDetails.status == 204) {
                    // create user
                    setContent(<CreateAccountPage email={user.email} setContent={setContent} />);
                } else {
                    console.log(userDetails);
                }
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
            {content}
        </div>
        
    );
}