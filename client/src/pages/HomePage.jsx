import Contacts from "../components/Contacts";
import Messages from "../components/Messages";

export default function HomePage () {
    return (
        <div className="flex w-full h-screen">
            <Contacts />
            <Messages />
        </div>
        
    );
}