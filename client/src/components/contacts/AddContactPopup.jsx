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
import { useState } from "react"


export function AddContactPopup() {

    const [searchMail, setSearchMail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert(9);
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
                    <Input type="email" 
                        placeholder="Search user email..." 
                        className="w-5/6 inline rounded-3xl"
                        value={searchMail}
                        onChange={(e) => {setSearchMail(e.target.value);}}
                    />
                    <Button variant="outline" size="icon" className="ml-2 rounded-full">
                        <IoMdSearch />
                    </Button>
                </form>

                <AlertDialogDescription />
                <AlertDialogCancel variant="destructive" size="icon" className="rounded-full absolute top-1 right-2">
                        <IoMdClose />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    )
}
