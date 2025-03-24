import { ImSpinner2 } from "react-icons/im";

export function LoadingSpinner() {
    return (
        <div className="flex w-full h-full bg-sky-400 justify-center items-center">
            <ImSpinner2 className="size-10 text-sky-100 animate-spin"/>
        </div>
    );
}