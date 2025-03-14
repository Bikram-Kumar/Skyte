const users = [
    "Bikram",
    "Bikram",
    "Bikram",
    "Bikram",
    "sdjk",
    "sdjk",
    "sdjk",
    "sdjk",
    "pasjkh",
    "sdjk",
    "sdjk",
    "sdjk",
    "sdjk",
    "sdjk",
    "sdjk",
    "sdjk",
]
import { AddContactPopup } from "./AddContactPopup";


export default function ContactList() {
    return (
        <div className="relative flex flex-col basis-5/12 bg-neutral-300">
            <div className="p-2 bg-sky-400 border-black ring-1">Contacts</div>
            <div className="flex flex-col h-full overflow-auto">
                {users.map((user, idx) => <Contact userName={user} key={idx} />)}
            </div>
            
            <AddContactPopup />
            
        </div>
    );
}

function Contact ({userName}) {
    return (
        <div className="w-full bg-neutral-200 rounded-md mb-0.5 p-2">
            {userName}
        </div>
    );
}