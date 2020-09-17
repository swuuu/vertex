import React , {useState} from "react";

function Greetings(){

    // name
    const name = localStorage.getItem("name") ? localStorage.getItem("name") : "";

    // creating the title of the site
    const [time, setTime] = useState(new Date());
    const [backgroundColor, setBackgroundColor] = useState("");
    const [greeting, setGreeting] = useState("");

    function generateTitle() {

        
        updateTime();
        let hour = time.getHours();
        if (hour >= 4 && hour < 12) {
            setBackgroundColor("morning-background");
            setGreeting("Good morning" + (!name ? "" : ", " + name));
        } else if (hour >= 12 && hour < 18) {
            setBackgroundColor("afternoon-background");
            setGreeting("Good afternoon" + (!name ? "" : ", " + name));
        } else if (hour >= 18 && hour < 22){
            setBackgroundColor("evening-background");
            setGreeting("Good evening" + (!name ? "" : ", " + name));
        } else {
            setBackgroundColor("night-background");
            setGreeting("Good evening" + (!name ? "" : ", " + name));
        }
    }

    function updateTime() {
        setTime(new Date());
    }

    React.useEffect(()=>{
        // adjusting the background color depending on the time of the day
        let body = document.getElementsByTagName("body")[0];
        body.className = backgroundColor;
    }, [backgroundColor])

    React.useEffect(()=>{
        const interval = setInterval(generateTitle, 1000);
        return ()=>clearInterval(interval);
    }, [])


    return (<div><h1>{greeting}</h1></div>)
}

export default Greetings;