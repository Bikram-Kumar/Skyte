import axios from "axios";
import { useRef, useState } from "react";
import { MainPage } from "./MainPage";
import { DPCropper } from "../components/DPCropper";
import avatarIcon from "@/assets/avatar.svg";
import { IoMdCreate } from "react-icons/io";


export function CreateAccountPage({email, setContent}) {
    const [info, setInfo] = useState({
        name: "",
        email: email,
        avatar: ""
    });
    console.log(info);

    const [dpCropperVisible, setDPCropperVisible] = useState(false);
    const [selectedImg, setSelectedImg] = useState("");

    const dpPickerRef = useRef(null);
    const dpImgRef = useRef(null);

    const handleChange = (e) => {
        setInfo(vals => ({...vals, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
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
    };

    const pickImage = (e) => {
        e.preventDefault();
        dpPickerRef.current?.click();
    };


    const changeDP = () => {
        console.log(dpPickerRef.current);

        if (dpPickerRef.current?.files && dpPickerRef.current?.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setSelectedImg(e.target.result);
            };
            reader.readAsDataURL(dpPickerRef.current?.files[0]);
            setDPCropperVisible(true);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center bg-sky-400">
            
            {dpCropperVisible && 
                (<div className="absolute z-50 w-full h-full bg-black bg-opacity-50">
                    <DPCropper imgData={selectedImg} setDPCropperVisible={setDPCropperVisible} infoState={[info,setInfo]} />
                </div>)
            }
            
            <div className="text-2xl font-semibold text-white pt-8">
                Welcome <span className="font-bold underline">{email}</span> to Skyte!
            </div>
            <div className="text-xl font-semibold text-white p-2">
                Setup your profile
            </div>

            <form className="flex flex-col items-center w-full p-4" 
                onSubmit={handleSubmit}>
                
                <div onClick={pickImage} className="relative">
                    <img ref={dpImgRef} className="size-24 rounded-full bg-white shadow-md shadow-slate-900"
                        src={info.avatar || avatarIcon}  
                    />
                    <IoMdCreate className="absolute top-0 right-0 p-2 size-8 bg-neutral-300 rounded-full"/>
                </div>

                <div className="text-white text-lg font-bold p-2">Profile Picture</div>

                <input ref={dpPickerRef} type="file" accept="image/*" name="avatar" hidden onChange={changeDP} />

                <br />
                <input className="p-2 rounded-md focus:outline-none w-64 focus:ring-2 ring-sky-500"
                    type="text"
                    name="name" 
                    placeholder="Your Name" 
                    value={info.name} 
                    onChange={handleChange}
                />
                
                {!dpCropperVisible && (<input className="absolute bottom-10 right-10 bg-blue-600 text-white py-2 px-4 rounded-lg hover:opacity-90"
                    type="submit"
                    value="Continue"
                />)}

            </form>
        </div>
    );
}