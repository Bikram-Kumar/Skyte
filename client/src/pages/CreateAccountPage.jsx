import axios from "axios";
import { useState } from "react";
import { MainPage } from "./MainPage";

export function CreateAccountPage({email, setContent}) {
    const [info, setInfo] = useState({
        name: "",
        email: email,
        avatar: ""
    });
    const handleChange = (e) => {
        setInfo(vals => ({...vals, [e.target.name]: e.target.value}));
    }
    return (
        <div className="w-full h-full flex justify-center items-center">
            <form onSubmit={async (e) => {
                e.preventDefault();
                const res = await axios.post("/api/user/create", {
                    name: info.name,
                    email: info.email,
                    avatar: info.avatar,
                });
                if (res.status == 201) {
                    setContent(<MainPage />);
                } else {
                    alert("Some error occured. Please try later")
                }
                console.log(res);
            }}>
                <label>
                    Email: <input type="text" name="email" disabled value={email} />
                </label>
                <br />
                <label>
                    Name: <input type="text" name="name" value={info.name} onChange={handleChange}/>
                </label>
                <br />
                <label>
                    Profile photo: <input type="image" name="avatar" value={info.avatar} onChange={handleChange} />
                </label>
                <br />
                <input type="submit" />
            </form>
        </div>
    );
}