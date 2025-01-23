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

export default function ContactList() {
    return (
        <div className="flex flex-col basis-1/2 bg-sky-100">
            <div className="p-2 bg-sky-400 border-black ring-1">Contacts</div>
            <div className="flex flex-col h-full overflow-auto">
                {users.map((user) => <Contact userName={user} />)}
            </div>
        </div>
    );
}

function Contact ({userName}) {
    return (
        <div className="w-full bg-neutral-50 rounded-md mb-0.5 p-2">
            {userName}
        </div>
    );
}