import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../lib/contexts";
import { IoMdSend } from "react-icons/io";
import { PiChatCircleDots } from "react-icons/pi";
import axios from "axios";
import avatarIcon from "@/assets/avatar.svg";

export default function Messages() {
    const [appContext, setAppContext] = useContext(AppContext);
    const [typedText, setTypedText] = useState("");
    const [messageList, setMessageList] = useState([]);
    const bottomRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        (async () => {
            if (!appContext || !appContext.currentChatId) return;
            const res = await axios.get("/api/message/getChatMessages?chatId=" + appContext.currentChatId);
            setMessageList(res.data);
        })();
    }, [appContext]);

    useEffect(() => {
        appContext?.socket.on("newMessage", (message) => {
            if (message.chatroom_id == appContext.currentChatId) {
                setMessageList([...messageList, message]);
            }
        });
    }, [appContext, messageList]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!typedText.trim()) return;
        const res = await axios.post("/api/message/create", {
            sender: appContext.userDetails.email,
            chatId: appContext.currentChatId,
            message: typedText
        });
        if (res.status == 200) {
            appContext.socket.emit("newMessage", res.data);
        }
        setTypedText("");
        textareaRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="flex flex-col flex-1" style={{background: '#0f1117', minWidth: 0}}>

            {appContext?.currentChatId ? (
                <>
                    {/* Chat header */}
                    <div className="flex flex-row items-center px-6 py-4"
                        style={{
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                            background: '#161b27',
                        }}>
                        <div className="relative">
                            {appContext?.currentChatDetails?.avatar ? (
                                <img
                                    className="rounded-full object-cover"
                                    style={{width: '38px', height: '38px', border: '1px solid rgba(255,255,255,0.1)'}}
                                    src={appContext.currentChatDetails.avatar}
                                />
                            ) : (
                                <div className="rounded-full flex items-center justify-center"
                                    style={{
                                        width: '38px', height: '38px',
                                        background: '#1c2333',
                                        border: '1px solid rgba(245,158,11,0.2)',
                                        color: '#f59e0b',
                                        fontWeight: 600,
                                        fontSize: '15px'
                                    }}>
                                    {appContext?.currentChatDetails?.name?.[0]?.toUpperCase()}
                                </div>
                            )}
                            {/* <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full"
                                style={{background: '#22c55e', border: '2px solid #161b27'}} /> */}
                        </div>
                        <div className="ml-3">
                            <p style={{color: '#e8eaf0', fontWeight: 500, fontSize: '15px'}}>
                                {appContext?.currentChatDetails?.name}
                            </p>
                            {/* <p style={{color: '#22c55e', fontSize: '11px', letterSpacing: '0.03em'}}>
                                Online
                            </p> */}
                        </div>
                    </div>

                    {/* Messages area */}
                    {messageList.length ? (
                        <div className="flex flex-col flex-1 px-6 py-4 overflow-auto gap-1">
                            {messageList.map((message, idx) => (
                                <MessageBox
                                    message={message}
                                    key={idx}
                                    prevSender={messageList[idx-1]?.sender}
                                />
                            ))}
                            <div ref={bottomRef} />
                        </div>
                    ) : (
                        <div className="flex flex-col flex-1 justify-center items-center gap-3">
                            <div className="w-16 h-16 rounded-full flex items-center justify-center"
                                style={{background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)'}}>
                                <PiChatCircleDots style={{width: '28px', height: '28px', color: '#f59e0b', opacity: 0.6}} />
                            </div>
                            <p style={{color: '#4f5873', fontSize: '14px'}}>
                                Say hi to start the conversation!
                            </p>
                        </div>
                    )}

                    {/* Message input */}
                    <div className="px-6 py-4" style={{borderTop: '1px solid rgba(255,255,255,0.06)'}}>
                        <form className="flex flex-row items-end gap-3" onSubmit={handleSubmit}>
                            <div className="flex-1 rounded-2xl overflow-hidden transition-all"
                                style={{
                                    background: '#161b27',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                }}>
                                <textarea
                                    ref={textareaRef}
                                    className="w-full px-4 py-3 resize-none"
                                    style={{
                                        background: 'transparent',
                                        color: '#e8eaf0',
                                        fontSize: '14px',
                                        outline: 'none',
                                        border: 'none',
                                        lineHeight: '1.5',
                                        maxHeight: '120px',
                                        minHeight: '44px',
                                    }}
                                    rows={1}
                                    placeholder="Type a message…"
                                    value={typedText}
                                    onChange={(e) => setTypedText(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={!typedText.trim()}
                                className="flex-shrink-0 flex items-center justify-center rounded-2xl transition-all"
                                style={{
                                    width: '46px', height: '46px',
                                    background: typedText.trim() ? '#f59e0b' : '#1c2333',
                                    color: typedText.trim() ? '#0f1117' : '#2e364f',
                                    border: 'none',
                                    cursor: typedText.trim() ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.15s ease'
                                }}
                            >
                                <IoMdSend style={{width: '18px', height: '18px'}} />
                            </button>
                        </form>
                        <p style={{color: '#2e364f', fontSize: '11px', marginTop: '6px', textAlign: 'center', letterSpacing: '0.02em'}}>
                            Enter to send · Shift+Enter for new line
                        </p>
                    </div>
                </>
            ) : (
                /* Empty state */
                <div className="flex flex-col flex-1 justify-center items-center gap-5">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-20 h-20 rounded-2xl flex items-center justify-center"
                            style={{
                                background: 'rgba(245,158,11,0.06)',
                                border: '1px solid rgba(245,158,11,0.12)'
                            }}>
                            <PiChatCircleDots style={{width: '36px', height: '36px', color: '#f59e0b', opacity: 0.5}} />
                        </div>
                        <div className="text-center">
                            <p style={{color: '#4f5873', fontSize: '15px', fontWeight: 500}}>
                                Select a conversation
                            </p>
                            <p style={{color: '#2e364f', fontSize: '13px', marginTop: '4px'}}>
                                Pick a chat from the sidebar to start messaging
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function MessageBox({ message, prevSender }) {
    const [appContext] = useContext(AppContext);
    const isMine = (message.sender == appContext.userDetails.email);
    const isGrouped = prevSender === message.sender;

    return (
        <div className={`flex ${isMine ? 'justify-end' : 'justify-start'} ${isGrouped ? 'mt-0.5' : 'mt-3'}`}>
            <div
                className="px-4 py-2.5 max-w-xs lg:max-w-md xl:max-w-lg"
                style={{
                    borderRadius: isMine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    background: isMine
                        ? 'linear-gradient(135deg, #1d4ed8, #2563eb)'
                        : '#1c2333',
                    color: isMine ? '#fff' : '#e8eaf0',
                    fontSize: '14px',
                    lineHeight: '1.5',
                    border: isMine ? 'none' : '1px solid rgba(255,255,255,0.06)',
                    boxShadow: isMine ? '0 2px 12px rgba(37,99,235,0.2)' : 'none',
                    wordBreak: 'break-word'
                }}
            >
                {message.message}
            </div>
        </div>
    );
}
