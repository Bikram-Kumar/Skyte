import axios from "axios";
import { useRef, useState } from "react";
import { MainPage } from "./MainPage";
import { DPCropper } from "../components/DPCropper";
import avatarIcon from "@/assets/avatar.svg";
import { IoMdCreate } from "react-icons/io";

export function CreateAccountPage({email, setContent}) {
    const [info, setInfo] = useState({ name: "", email: email, avatar: "" });
    const [dpCropperVisible, setDPCropperVisible] = useState(false);
    const [selectedImg, setSelectedImg] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const dpPickerRef = useRef(null);

    const handleChange = (e) => {
        setInfo(vals => ({...vals, [e.target.name]: e.target.value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axios.post("/api/user/create", {
                name: info.name, email: info.email, avatar: info.avatar,
            });
            if (res.status == 201) setContent(<MainPage />);
            else alert("Some error occurred. Please try later");
        } finally {
            setIsLoading(false);
        }
    };

    const pickImage = (e) => { e.preventDefault(); dpPickerRef.current?.click(); };

    const changeDP = () => {
        if (dpPickerRef.current?.files && dpPickerRef.current?.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => setSelectedImg(e.target.result);
            reader.readAsDataURL(dpPickerRef.current?.files[0]);
            setDPCropperVisible(true);
        }
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative"
            style={{background: 'linear-gradient(135deg, #0f1117 0%, #161b27 60%, #0f1117 100%)'}}>

            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-5"
                    style={{background: 'radial-gradient(circle, #f59e0b, transparent)'}} />
                <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-5"
                    style={{background: 'radial-gradient(circle, #3b82f6, transparent)'}} />
            </div>

            {dpCropperVisible && (
                <div className="absolute z-50 inset-0" style={{background: 'rgba(0,0,0,0.85)'}}>
                    <DPCropper imgData={selectedImg} setDPCropperVisible={setDPCropperVisible} infoState={[info, setInfo]} />
                </div>
            )}

            <div className="relative z-10 flex flex-col items-center w-full max-w-md px-8 anim-fadeUp">
                {/* Logo / Brand */}
                <div className="mb-8 text-center">
                    <h1 style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: '2.5rem',
                        fontWeight: 600,
                        color: '#f59e0b',
                        letterSpacing: '-0.02em',
                        lineHeight: 1
                    }}>Skyte</h1>
                    <p style={{color: '#4f5873', fontSize: '13px', marginTop: '6px', letterSpacing: '0.05em'}}>
                        Set up your profile to get started
                    </p>
                </div>

                {/* Card */}
                <div className="w-full rounded-2xl p-8 flex flex-col items-center gap-6"
                    style={{
                        background: '#161b27',
                        border: '1px solid rgba(255,255,255,0.07)',
                        boxShadow: '0 8px 40px rgba(0,0,0,0.4)'
                    }}>

                    {/* Avatar picker */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative cursor-pointer group" onClick={pickImage}>
                            <img
                                className="rounded-full object-cover"
                                style={{
                                    width: '96px', height: '96px',
                                    background: '#1c2333',
                                    border: '2px solid rgba(245,158,11,0.3)',
                                    transition: 'border-color 0.2s'
                                }}
                                src={info.avatar || avatarIcon}
                            />
                            <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{background: 'rgba(0,0,0,0.5)'}}>
                                <IoMdCreate style={{color: '#f59e0b', width: '22px', height: '22px'}} />
                            </div>
                        </div>
                        <span style={{color: '#4f5873', fontSize: '12px', letterSpacing: '0.04em'}}>
                            Click to upload photo
                        </span>
                    </div>

                    <input ref={dpPickerRef} type="file" accept="image/*" name="avatar" hidden onChange={changeDP} />

                    {/* Email display */}
                    <div className="w-full rounded-xl px-4 py-3"
                        style={{background: '#1c2333', border: '1px solid rgba(255,255,255,0.05)'}}>
                        <p style={{fontSize: '11px', color: '#4f5873', marginBottom: '2px', letterSpacing: '0.06em', textTransform: 'uppercase'}}>Account</p>
                        <p style={{color: '#8b93a8', fontSize: '14px'}}>{email}</p>
                    </div>

                    {/* Name input */}
                    <div className="w-full">
                        <label style={{fontSize: '12px', color: '#4f5873', letterSpacing: '0.06em', textTransform: 'uppercase', display: 'block', marginBottom: '8px'}}>
                            Display Name
                        </label>
                        <input
                            className="w-full rounded-xl px-4 py-3 transition-all"
                            style={{
                                background: '#1c2333',
                                border: '1px solid rgba(255,255,255,0.08)',
                                color: '#e8eaf0',
                                fontSize: '15px',
                                outline: 'none',
                            }}
                            onFocus={e => e.target.style.borderColor = 'rgba(245,158,11,0.5)'}
                            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                            type="text"
                            name="name"
                            placeholder="How should we call you?"
                            value={info.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Submit */}
                    {!dpCropperVisible && (
                        <button
                            onClick={handleSubmit}
                            disabled={isLoading || !info.name.trim()}
                            className="w-full rounded-xl py-3 font-medium transition-all"
                            style={{
                                background: info.name.trim() ? '#f59e0b' : '#2e364f',
                                color: info.name.trim() ? '#0f1117' : '#4f5873',
                                fontSize: '15px',
                                fontWeight: 600,
                                cursor: info.name.trim() ? 'pointer' : 'not-allowed',
                                border: 'none',
                                letterSpacing: '0.01em'
                            }}
                        >
                            {isLoading ? 'Creating...' : 'Continue to Skyte →'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
