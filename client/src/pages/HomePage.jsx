import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { CreateAccountPage } from "./CreateAccountPage";
import { MainPage } from "./MainPage";
import { AppContext } from "../lib/contexts";
import { io } from "socket.io-client"
import { LoadingSpinner } from '../components/LoadingSpinner';

export default function HomePage () {

    const [appContext, setAppContext] = useState();
    const [content, setContent] = useState(<LoadingSpinner />);

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
                
                axios.defaults.baseURL = import.meta.env.VITE_APP_API_ENDPOINT;
                axios.defaults.headers.common['authorization'] = 'Bearer ' + token;
                const userDetails = await axios.get("/api/user/retrieve?email=" + user.email);
                
                if (userDetails.status == 204) {
                    // create user
                    setContent(<CreateAccountPage email={user.email} setContent={setContent} />);
                } else {
                    // user exists... setup the app
                    // console.log(userDetails.data);
                    setAppContext({
                        ...appContext,
                        userDetails: userDetails.data,
                        socket: io(import.meta.env.VITE_APP_API_ENDPOINT, {
                            query: {
                                email: user.email
                            }
                        })
                    });
                    setContent(<MainPage />);

                }
                // console.log(user.email);

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
        
        <AppContext.Provider value={[appContext, setAppContext]}>
            <div className="flex w-full h-svh select-none font-sans">
                {content}
            </div>
        </AppContext.Provider>
        
    );
}