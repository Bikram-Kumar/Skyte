import { useContext, useEffect, useState } from "react";
import { AddContactPopup } from "./AddContactPopup";
import { AppContext } from "../../lib/contexts";
import axios from "axios";
import { IoMdExit } from "react-icons/io";
import { LiaComments } from "react-icons/lia";
import { useAuth0 } from "@auth0/auth0-react";
import avatarIcon from "@/assets/avatar.svg";

export default function ContactList() {
    const [appContext, setAppContext] = useContext(AppContext);
    const [chatList, setChatList] = useState([]);
    const { logout } = useAuth0();

    useEffect(() => {
        (async () => {
            if (!appContext) return;
            const res = await axios.get("/api/chatroom/getChatList?email=" + appContext.userDetails.email);
            setChatList(res.data);
        })();
    }, [appContext]);

    return (
        <div className="relative flex flex-col"
            style={{
                width: '320px',
                minWidth: '280px',
                background: '#161b27',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                height: '100%'
            }}>

            {/* Header */}
            <div className="flex flex-row items-center justify-between px-5 py-4"
                style={{borderBottom: '1px solid rgba(255,255,255,0.06)'}}>
                <div>
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: '#f59e0b',
                        lineHeight: 1,
                        letterSpacing: '-0.01em'
                    }}>Skyte</h1>
                    <p style={{fontSize: '11px', color: '#4f5873', marginTop: '3px', letterSpacing: '0.04em'}}>
                        {appContext?.userDetails?.name}
                    </p>
                </div>

                <button
                    className="flex items-center justify-center rounded-xl transition-all"
                    style={{
                        width: '36px', height: '36px',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        color: '#4f5873',
                        cursor: 'pointer'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.12)'; e.currentTarget.style.color = '#ef4444'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#4f5873'; }}
                    onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                    title="Sign out"
                >
                    <IoMdExit style={{width: '16px', height: '16px'}} />
                </button>
            </div>

            {/* Section label */}
            <div className="px-5 pt-5 pb-2">
                <p style={{fontSize: '11px', color: '#4f5873', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500}}>
                    Messages
                </p>
            </div>

            {/* Chat list */}
            <div className="flex flex-col flex-1 overflow-auto">
                {chatList.length ? (
                    chatList.map((chat, idx) => (
                        <Contact
                            chat={chat}
                            isOpen={chat._id == appContext.currentChatId}
                            key={idx}
                        />
                    ))
                ) : (
                    <div className="flex flex-col w-full flex-1 justify-center items-center gap-3">
                        <LiaComments style={{width: '32px', height: '32px', color: '#2e364f'}} />
                        <p style={{color: '#4f5873', fontSize: '13px'}}>No conversations yet</p>
                        <p style={{color: '#2e364f', fontSize: '12px'}}>Add someone to get started</p>
                    </div>
                )}
            </div>

            <AddContactPopup />
        </div>
    );
}

function Contact({ chat, isOpen }) {
    const [appContext, setAppContext] = useContext(AppContext);
    const [chatDetails, setChatDetails] = useState(chat);

    const handleClick = () => {
        if (appContext.currentChatId == chat._id) return;
        setAppContext({
            ...appContext,
            currentChatId: chat._id,
            currentChatDetails: chatDetails
        });
    };

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
    }, []);

    const displayName = chat.is_dm ? chatDetails?.name : chat.name;
    const initial = displayName?.[0]?.toUpperCase() || '?';

    return (
        <div
            className="flex flex-row items-center px-4 py-3 mx-2 my-0.5 rounded-xl transition-all cursor-pointer"
            style={{
                background: isOpen ? 'rgba(245,158,11,0.1)' : 'transparent',
                borderLeft: isOpen ? '2px solid #f59e0b' : '2px solid transparent',
            }}
            onMouseEnter={e => { if (!isOpen) e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={e => { if (!isOpen) e.currentTarget.style.background = 'transparent'; }}
            onClick={handleClick}
        >
            {/* Avatar */}
            <div className="relative flex-shrink-0">
                {chatDetails?.avatar ? (
                    <img
                        className="rounded-full object-cover"
                        style={{width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.08)'}}
                        src={chatDetails.avatar}
                    />
                ) : (
                    <div className="rounded-full flex items-center justify-center text-sm font-semibold"
                        style={{
                            width: '40px', height: '40px',
                            background: isOpen ? 'rgba(245,158,11,0.2)' : '#1c2333',
                            color: isOpen ? '#f59e0b' : '#4f5873',
                            border: '1px solid rgba(255,255,255,0.06)',
                            fontSize: '15px',
                            fontWeight: 600
                        }}>
                        {initial}
                    </div>
                )}
                {/* Online dot placeholder */}
                {/* <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
                    style={{background: '#22c55e', border: '2px solid #161b27'}} /> */}
            </div>

            {/* Info */}
            <div className="ml-3 flex-1 min-w-0">
                <p className="truncate" style={{
                    color: isOpen ? '#f0c84e' : '#e8eaf0',
                    fontSize: '14px',
                    fontWeight: isOpen ? 500 : 400
                }}>
                    {displayName || '...'}
                </p>
                <p style={{color: '#4f5873', fontSize: '12px', marginTop: '1px'}}>
                    Direct message
                </p>
            </div>
        </div>
    );
}
