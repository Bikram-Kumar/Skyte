import { IoMdAdd, IoMdClose, IoMdSearch } from "react-icons/io"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useContext, useRef, useState } from "react"
import axios from "axios"
import { AppContext } from "../../lib/contexts"
import avatarLogo from "@/assets/avatar.svg";

export function AddContactPopup() {
    const [searchMail, setSearchMail] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [appContext, setAppContext] = useContext(AppContext);
    const closeAlertRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!searchMail.trim()) return;
        setIsSearching(true);
        try {
            const res = await axios.get("/api/user/search?keyword=" + searchMail);
            setSearchResult(res.data.filter((contact) => contact.email != appContext.userDetails.email));
        } finally {
            setIsSearching(false);
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button
                    className="absolute bottom-5 right-5 flex items-center justify-center rounded-xl transition-all"
                    style={{
                        width: '40px', height: '40px',
                        background: '#f59e0b',
                        color: '#0f1117',
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(245,158,11,0.35)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#fbbf24'}
                    onMouseLeave={e => e.currentTarget.style.background = '#f59e0b'}
                >
                    <IoMdAdd style={{width: '20px', height: '20px', fontWeight: 700}} />
                </button>
            </AlertDialogTrigger>
            <AlertDialogTitle />
            <AlertDialogContent style={{
                background: '#161b27',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
                padding: '24px',
                maxWidth: '400px',
                width: '90vw'
            }}>
                {/* Header */}
                <div className="mb-5">
                    <h2 style={{color: '#e8eaf0', fontSize: '17px', fontWeight: 600}}>New Conversation</h2>
                    <p style={{color: '#4f5873', fontSize: '12px', marginTop: '3px'}}>Search by name or email</p>
                </div>

                {/* Search form */}
                <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                    <input
                        type="text"
                        placeholder="Search people…"
                        className="flex-1 rounded-xl px-4 py-2.5"
                        style={{
                            background: '#1c2333',
                            border: '1px solid rgba(255,255,255,0.08)',
                            color: '#e8eaf0',
                            fontSize: '14px',
                            outline: 'none',
                        }}
                        onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.4)'}
                        onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                        value={searchMail}
                        onChange={(e) => setSearchMail(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                            width: '42px', height: '42px',
                            background: '#f59e0b',
                            color: '#0f1117',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        <IoMdSearch style={{width: '18px', height: '18px'}} />
                    </button>
                </form>

                {/* Results */}
                <div className="overflow-auto" style={{maxHeight: '240px', minHeight: '80px'}}>
                    {isSearching ? (
                        <div className="flex justify-center items-center h-20">
                            <p style={{color: '#4f5873', fontSize: '13px'}}>Searching…</p>
                        </div>
                    ) : searchResult.length ? (
                        <div className="flex flex-col gap-1">
                            {searchResult.map((contact, idx) => (
                                <ContactTile key={idx} contact={contact} closeAlertRef={closeAlertRef} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center h-20">
                            <p style={{color: '#2e364f', fontSize: '13px'}}>
                                {searchMail ? 'No results found' : 'Start typing to search'}
                            </p>
                        </div>
                    )}
                </div>

                <AlertDialogDescription />
                <AlertDialogCancel ref={closeAlertRef}
                    className="absolute top-4 right-4 flex items-center justify-center rounded-xl"
                    style={{
                        width: '32px', height: '32px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#4f5873',
                        padding: 0
                    }}>
                    <IoMdClose style={{width: '14px', height: '14px'}} />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    );
}

function ContactTile({ contact, closeAlertRef }) {
    const [appContext, setAppContext] = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        setIsLoading(true);
        closeAlertRef.current.click();
        const res = await axios.get(`/api/chatroom/retrieve?isDM=true&email1=${appContext.userDetails.email}&email2=${contact.email}`);
        let chatId = res.data._id;
        if (res.status == 204) {
            const chatRes = await axios.post("/api/chatroom/create", {
                emails: [appContext.userDetails.email, contact.email],
                isDM: true
            });
            chatId = chatRes.data._id;
        }
        let chatDetails = await axios.get("/api/user/retrieve?email=" + contact.email);
        setAppContext({
            ...appContext,
            currentChatId: chatId,
            currentChatDetails: chatDetails.data
        });
        setIsLoading(false);
    };

    const initial = contact.name?.[0]?.toUpperCase() || '?';

    return (
        <div
            className="flex flex-row items-center px-3 py-3 rounded-xl cursor-pointer transition-all"
            style={{background: 'transparent'}}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.04)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            onClick={handleClick}
        >
            {contact.avatar ? (
                <img className="rounded-full object-cover flex-shrink-0"
                    style={{width: '40px', height: '40px', border: '1px solid rgba(255,255,255,0.08)'}}
                    src={contact.avatar} alt="avatar" />
            ) : (
                <div className="rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                        width: '40px', height: '40px',
                        background: '#1c2333',
                        color: '#f59e0b',
                        fontWeight: 600, fontSize: '15px',
                        border: '1px solid rgba(245,158,11,0.15)'
                    }}>
                    {initial}
                </div>
            )}
            <div className="ml-3 flex-1 min-w-0">
                <p style={{color: '#e8eaf0', fontSize: '14px', fontWeight: 500}}>{contact.name}</p>
                <p className="truncate" style={{color: '#4f5873', fontSize: '12px', marginTop: '1px'}}>{contact.email}</p>
            </div>
            <div className="flex-shrink-0 rounded-lg px-3 py-1 ml-2"
                style={{
                    background: 'rgba(245,158,11,0.1)',
                    border: '1px solid rgba(245,158,11,0.2)',
                    color: '#f59e0b',
                    fontSize: '12px'
                }}>
                Chat
            </div>
        </div>
    );
}
