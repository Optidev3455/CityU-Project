import { useEffect, useState } from "react";
import "./navbar.scss";

const Navbar = () => {
    const [currentTime, setCurrentTime] = useState<string>("");

    const updateTime = () => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
    };

    useEffect(() => {
        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="navbar">
            <div className="logo">
                <img src="/react.svg" alt="" />
                <span>DashBoard</span>
            </div>
            <div className="time">
                <span>{currentTime}</span>
            </div>
        </div>
    );
};

export default Navbar;
