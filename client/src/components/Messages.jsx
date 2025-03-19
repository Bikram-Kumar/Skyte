import { useContext, useEffect, useState, useRef } from "react";
import { AppContext } from "../lib/contexts";
import { IoMdSend } from "react-icons/io"
import axios from 'axios';


export default function Messages() {
    const [appContext, setAppContext] = useContext(AppContext);
    const [typedText, setTypedText] = useState("");
    const [messageList, setMessageList] = useState([]);
    const bottomRef = useRef(null);

    useEffect(() => {
        (async () => {
            if (!appContext || !appContext.currentChatId) return;
            const res = await axios.get("http://localhost:3000/api/message/getChatMessages?chatId=" + appContext.currentChatId);
            setMessageList(res.data); 
        })(); 
    }, [appContext]);

    useEffect(() => {
        appContext.socket.on("newMessage", (message) => {
            if (message.chatroom_id == appContext.currentChatId) {
                setMessageList([...messageList, message]);
            }
        });
    }, [appContext, messageList]);
    
    useEffect(()=>{
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messageList]);
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:3000/api/message/create", {
            sender: appContext.userDetails.email,
            chatId: appContext.currentChatId,
            message: typedText
        });
        if (res.status == 200) {
            console.log(res);
            appContext.socket.emit("newMessage", res.data);
        }
        setTypedText("");
    };

    return (
        <div className="flex flex-col basis-7/12 bg-neutral-100">
            <div className="w-full bg-sky-400 p-2 border-l overflow-ellipsis">
                {(appContext?.currentChatDetails?.name) || "Skyte"}
            </div>
            <div className="flex flex-col p-2 bg-slate-200 h-full overflow-auto">
                {messageList.map((message, idx) => <MessageBox message={message} key={idx} />)}
                <div ref={bottomRef} />
            </div>

            { (appContext?.currentChatId) && (

            <form className="flex flex-row w-full" onSubmit={handleSubmit}>
                <textarea className="grow p-2 mr-1 focus:outline-sky-500" 
                    placeholder="Type your message..."
                    value={typedText}
                    onChange={(e) => {setTypedText(e.target.value)}}
                />
                <button type="submit">
                    <IoMdSend className="size-10 p-2 text-white bg-sky-500 rounded-full" />
                </button>
            </form>)}
        </div>
    )
}

function MessageBox({message}) {
    const [appContext, setAppContext] = useContext(AppContext);
    const isMine = (message.sender == appContext.userDetails.email);
    return (
        <div className={`w-fit max-w-96 mb-2 rounded-xl p-2 ${isMine ? "bg-sky-500 text-white self-end" : "bg-neutral-100 text-black"}`}>
            {message.message}
        </div>
    );
}