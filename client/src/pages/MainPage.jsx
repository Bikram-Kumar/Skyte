import ContactList from "../components/contacts/Contacts";
import Messages from "../components/Messages";

export function MainPage() {
    return (
        <div className="flex w-full h-full" style={{background: '#0f1117'}}>
            <ContactList />
            <Messages />
        </div>
    );
}
