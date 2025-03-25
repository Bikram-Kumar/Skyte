import { useContext, useEffect, useState } from "react";
import { AddContactPopup } from "./AddContactPopup";
import { AppContext } from "../../lib/contexts";
import axios from "axios";
import { IoMdExit } from "react-icons/io";
import { useAuth0 } from "@auth0/auth0-react";
import avatarIcon from "@/assets/avatar.svg";

export default function ContactList() {
    const [appContext, setAppContext] = useContext(AppContext);
    const [chatList, setChatList] = useState([]);
    const {logout} = useAuth0();

    useEffect(() => {
        (async () => {
            if (!appContext) return;
            const res = await axios.get("/api/chatroom/getChatList?email=" + appContext.userDetails.email);
            setChatList(res.data);
            // console.log(chatList);
        })();
    }, [appContext]);
    // console.log(appContext);
    
    return (
        <div className="relative flex flex-col basis-5/12 bg-neutral-200">
            <div className="flex flex-row justify-between p-3 bg-sky-400 border-black ring-1">
                <span className="text-white font-extrabold font-mono space-x-1">
                    Skyte
                </span>
                <button className="hover:opacity-90"
                    onClick={() => {logout({logoutParams: {returnTo: window.location.origin}})}} 
                >
                    <IoMdExit className="size-6 text-white" />
                </button>
            </div>
            <div className="flex flex-col h-full overflow-auto">
                {chatList.length ? chatList.map((chat, idx) => <Contact chat={chat} isOpen={chat._id == appContext.currentChatId} key={idx} />)
                : "Start some chat"}
            </div>
            
            <AddContactPopup />
            
        </div>
    );
}

function Contact ({chat, isOpen}) {
    const [appContext, setAppContext] = useContext(AppContext);
    const handleClick = (e) => {
        if (appContext.currentChatId == chat._id) return;
        setAppContext({
            ...appContext,
            currentChatId: chat._id,
            currentChatDetails: chatDetails
        });
    };
    const [chatDetails, setChatDetails] = useState(chat);
    useEffect(() => {
        (async () => {
            if (!chat.is_dm) return;
            for (const email of chat.emails.split(",")) {
                if (email != appContext.userDetails.email) {
                    const res = await axios.get("/api/user/retrieve?email=" + email);
                    setChatDetails(res.data);
                }
            }
        })();
    },[]);
    return (
        <div className={`w-full flex flex-row items-center ${isOpen ? "bg-sky-200" : "bg-neutral-100"} rounded-md mb-0.5 p-2`}
            onClick={handleClick}
        >
            <img className="size-8 bg-white mr-2 rounded-full" src={chatDetails?.avatar || avatarIcon}/>
            {chat.is_dm ? chatDetails?.name : chat.name}
        </div>
    );
}