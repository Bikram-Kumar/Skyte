import { ImSpinner2 } from "react-icons/im";

export function LoadingSpinner() {
    return (
        <div className="flex w-full h-full justify-center items-center"
            style={{background: 'linear-gradient(135deg, #0f1117 0%, #161b27 100%)'}}>
            <div className="flex flex-col items-center gap-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full"
                        style={{border: '2px solid rgba(245,158,11,0.15)'}}>
                    </div>
                    <div className="absolute inset-0 w-16 h-16 rounded-full"
                        style={{
                            border: '2px solid transparent',
                            borderTopColor: '#f59e0b',
                            animation: 'spinAnim 0.8s linear infinite'
                        }}>
                    </div>
                </div>
                <span style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: '#4f5873',
                    fontSize: '13px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                }}>Loading</span>
            </div>
        </div>
    );
}
