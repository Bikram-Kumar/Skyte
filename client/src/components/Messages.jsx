import { useContext } from "react";
import { AppContext } from "../lib/contexts";

const messages = [
    "hi how are you",
    "hi how are you. i am fine thanks",
    "hi how are you",
    "here is a demo text for 100 times testing by lorem ipsum doler sit amet ff",
    "here is a demo text for 100 times testing by lorem ipsum doler sit amet ff",
    "here is a demo text for 100 times testing by lorem ipsum doler sit amet ff",
    "here is a demo text for 100 times testing by lorem ipsum doler sit amet ff",
    "good",
    "hi how are you",
    "here is a demo text for 100 times testing by lorem ipsum doler sit amet ff",
    "hi how are you"
]



export default function Messages() {
    const [appContext, setAppContext] = useContext(AppContext);
    if (!appContext) return;
    return (
        <div className="flex flex-col basis-7/12 bg-neutral-100">
            <div className="w-full bg-sky-400 p-2 border-l">{appContext.currentChatId || "Skyte"}</div>
            <div className="flex flex-col p-2 bg-emerald-300 h-full overflow-auto">
                {messages.map((message, idx) => <MessageBox message={message} key={idx} />)}
            </div>
        </div>
    )
}

function MessageBox({message}) {
    return (
        <div className="w-fit max-w-96 mb-2 rounded-xl p-2 bg-sky-500 text-white">
            {message}
        </div>
    );
}