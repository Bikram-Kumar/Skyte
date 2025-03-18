import { createContext } from "react";

export const AppContext = createContext({
    userDetails: {          
        email: "",
        name: "",
        avatar: ""
    },
    currentChatId: "",      // chatroom id of currently opened chat
    contactDetails: [],      // details of user's contacts
    socket: {}              // socket.io connection object
});