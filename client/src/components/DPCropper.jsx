import { useEffect, useRef, useState } from "react";
import { IoMdCheckmark, IoMdClose, IoMdDoneAll, IoMdGitCommit } from "react-icons/io";

export function DPCropper({imgData, setDPCropperVisible, infoState}){
    const cnvsRef = useRef(null);
    const [ctxOrg, setCtxOrg] = useState(null);             // original image resized
    const [ctxVisible, setCtxVisible] = useState(null);     // image visible with post-processing for cropping
    const [info, setInfo] = infoState;
    const size = 128;
    const [coord, setCoord] = useState({x: 0, y: 0});

    useEffect(() => {

        setCtxOrg(document.createElement("canvas").getContext("2d"));

        const ctxVisible = cnvsRef.current.getContext("2d");
        setCtxVisible(ctxVisible);

    }, []);

    useEffect(() => {
        if (!imgData || !ctxOrg) return;
        const img = new Image();
        img.onload = () => {
            const asp = img.naturalWidth / img.naturalHeight;
            if (asp > 1) {
                ctxOrg.canvas.width = size * asp;
                ctxOrg.canvas.height = size;
            } else {
                ctxOrg.canvas.width = size;
                ctxOrg.canvas.height = size / asp;
            }
            ctxVisible.canvas.width = ctxOrg.canvas.width;
            ctxVisible.canvas.height = ctxOrg.canvas.height;

            ctxOrg.drawImage(img, 0, 0, ctxOrg.canvas.width, ctxOrg.canvas.height);

            ctxVisible.filter = "brightness(50%)";
            ctxVisible.drawImage(ctxOrg.canvas, 0, 0, ctxOrg.canvas.width, ctxOrg.canvas.height)

            let mx = ctxOrg.canvas.width / 2, my = ctxOrg.canvas.height / 2;
            let coordX = mx, coordY = my;
            ctxVisible.canvas.addEventListener("mousemove", (e) => {
                if (e.buttons != 1) return;
                let x = e.offsetX * e.target.width / e.target.clientWidth, y = e.offsetY * e.target.height / e.target.clientHeight;
                if (x > size / 2 && x < ctxOrg.canvas.width - size / 2) coordX = x;
                if (y > size / 2 && y < ctxOrg.canvas.height - size / 2) coordY = y;
                setCoord({x: coordX, y: coordY});
                ctxVisible.filter = "brightness(50%)";
                ctxVisible.drawImage(ctxOrg.canvas, 0, 0, ctxVisible.canvas.width, ctxVisible.canvas.height);
                ctxVisible.filter = "brightness(100%)";
                ctxVisible.drawImage(ctxOrg.canvas, coordX - size / 2, coordY - size / 2, size, size, coordX - size / 2, coordY - size / 2, size, size);
            });
            
            setCoord({x: coordX, y: coordY});
            ctxVisible.filter = "brightness(50%)";
            ctxVisible.drawImage(ctxOrg.canvas, 0, 0, ctxVisible.canvas.width, ctxVisible.canvas.height);
            ctxVisible.filter = "brightness(100%)";
            ctxVisible.drawImage(ctxOrg.canvas, coordX - size / 2, coordY - size / 2, size, size, coordX - size / 2, coordY - size / 2, size, size);

        };
        img.src = imgData;
    }, [imgData]);
    
    return (
        <div className="w-full h-full flex items-center justify-center  ">
            <canvas className="bg-black bg-opacity-50 w-full h-full object-contain" ref={cnvsRef}></canvas>
            <IoMdClose className="absolute top-2 left-2 size-8 text-neutral-400 hover:opacity-90"
                onClick={() => {setDPCropperVisible(false)}}
            />
            <IoMdCheckmark className="absolute top-2 right-2 size-8 text-neutral-400 hover:opacity-90"
                onClick={() => {
                    const ctx = document.createElement("canvas").getContext("2d");
                    ctx.canvas.width = size;
                    ctx.canvas.height = size;
                    ctx.drawImage(ctxOrg.canvas, coord.x - size / 2, coord.y - size / 2, size, size, 0, 0, size, size);
                    setInfo({
                        ...info,
                        avatar: ctx.canvas.toDataURL() 
                    });
                    setDPCropperVisible(false);
                }}
            />
        </div>
    );
};