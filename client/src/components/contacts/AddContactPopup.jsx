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
import { useContext, useState } from "react"
import axios from "axios"
import { UserContext } from "../../lib/contexts"

export function AddContactPopup() {

    const [searchMail, setSearchMail] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [userContext, setUserContext] = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.get("http://localhost:3000/api/user/search?keyword=" + searchMail);
        console.log(res);
        setSearchResult(res.data.filter((contact) => contact.email != userContext.email));
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
                        searchResult.map((contact, idx) => <ContactTile key={idx} contact={contact} />)
                        : "No match"}
                </div>

                <AlertDialogDescription />
                <AlertDialogCancel className="rounded-full absolute top-0 right-0 shadow-sm size-8">
                    <IoMdClose />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}



function ContactTile({contact}) {
    return (
        <div className="w-full bg-neutral-200 rounded-md mb-0.5 p-2 flex flex-col">
            <p className="text-base">{contact.name}</p>
            <p className="text-xs">{contact.email}</p>
        </div>
    );
}
