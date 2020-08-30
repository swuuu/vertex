import React, {useState} from "react";

function Time() {

    setInterval(updateTime, 1000);

    const now = new Date().toLocaleTimeString();
    const [time, setTime] = useState(now);

    function updateTime() {
        const now = new Date().toLocaleTimeString();
        setTime(now);
    }

    function generateDate(date) {
        return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+ date.getDate();
    }

    const date = new Date();

    return (
        <div>
            <h3>{generateDate(date)}</h3>
            <h3>{time}</h3>
        </div>
    )
}

export default Time;