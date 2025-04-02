import {IoMdAdd, IoMdClose, IoMdSearch } from "react-icons/io"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useContext, useRef, useState } from "react"
import axios from "axios"
import { AppContext } from "../../lib/contexts"
import avatarLogo from "@/assets/avatar.svg";

export function AddContactPopup() {

    const [searchMail, setSearchMail] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [appContext, setAppContext] = useContext(AppContext);
    const closeAlertRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.get("/api/user/search?keyword=" + searchMail);
        // console.log(res);
        setSearchResult(res.data.filter((contact) => contact.email != appContext.userDetails.email));
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline" size="icon" className="absolute bottom-4 right-4 size-10 p-1 rounded-md">
                    <IoMdAdd />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogTitle />
            <AlertDialogContent>
                <form onSubmit={handleSubmit}>
                    <Input type="text" 
                        placeholder="Find people..." 
                        className="w-3/4 inline rounded-3xl"
                        value={searchMail}
                        onChange={(e) => {setSearchMail(e.target.value);}}
                    />
                    <Button variant="outline" size="icon" className="ml-2 rounded-full">
                        <IoMdSearch />
                    </Button>
                </form>
                <div className="h-48 overflow-auto">
                    {searchResult.length ?
                        searchResult.map((contact, idx) => <ContactTile key={idx} contact={contact} closeAlertRef={closeAlertRef} />)
                        : "No match"}
                </div>

                <AlertDialogDescription />
                <AlertDialogCancel ref={closeAlertRef} className="rounded-full absolute top-0 right-0 shadow-sm size-8">
                    <IoMdClose />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}



function ContactTile({contact, closeAlertRef}) {
    const [appContext, setAppContext] = useContext(AppContext);
    const handleClick = async (e) => {
        closeAlertRef.current.click();
        const res = await axios.get(`/api/chatroom/retrieve?isDM=true&email1=${appContext.userDetails.email}&email2=${contact.email}`);
        
        let chatId = res.data._id;
        if (res.status == 204) {
            // create chatroom
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
    };


    return (
        <div className="w-full rounded-md mb-0.5 p-2 flex flex-row hover:bg-neutral-200" onClick={handleClick}>

            <img className="size-10 rounded-full mr-3" src={contact.avatar || avatarLogo} alt="img" />

            <div className="flex flex-col">
                <p className="text-base">{contact.name}</p>
                <p className="text-xs">{contact.email}</p>
            </div>
        </div>
    );
}
