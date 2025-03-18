import { useContext, useEffect, useState } from "react";
import { AppContext } from "../lib/contexts";
import { IoMdSend } from "react-icons/io"
import axios from 'axios';


export default function Messages() {
    const [appContext, setAppContext] = useContext(AppContext);
    const [typedText, setTypedText] = useState("");
    const [messageList, setMessageList] = useState([]);
    
    useEffect(() => {
        (async () => {
            if (!appContext || !appContext.currentChatId) return;
            const res = await axios.get("http://localhost:3000/api/message/getChatMessages?chatId=" + appContext.currentChatId);
        
            setMessageList(res.data);
            
            appContext.socket.on("newMessage", (message) => {
                if (message.chatroom_id == appContext.currentChatId) setMessageList([...res.data, message]);
                // alert("new message");
            })
        })();
    }, [appContext]);

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
            <div className="w-full bg-sky-400 p-2 border-l">{(appContext && appContext.currentChatId) || "Skyte"}</div>
            <div className="flex flex-col p-2 bg-emerald-300 h-full overflow-auto">
                {messageList.map((message, idx) => <MessageBox message={message} key={idx} />)}
            </div>
            <form className="flex flex-row" onSubmit={handleSubmit}>
                <textarea className="" 
                    placeholder="Type your message..."
                    value={typedText}
                    onChange={(e) => {setTypedText(e.target.value)}}
                />
                <button type="submit"><IoMdSend /></button>
            </form>
        </div>
    )
}

function MessageBox({message}) {
    return (
        <div className="w-fit max-w-96 mb-2 rounded-xl p-2 bg-sky-500 text-white">
            {message.message}
        </div>
    );
}