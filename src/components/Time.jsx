import React, {useState} from "react";

function useInterval(callback, delay) {
    const savedCallback = React.useRef();
  
    React.useEffect(() => {
      savedCallback.current = callback;
    });
  
    React.useEffect(()=> {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }
    , [delay]);
}

function Time() {

    // time
    setInterval(updateTime, 1000);

    const now = new Date().toLocaleTimeString();
    const [time, setTime] = useState(now);

    function updateTime() {
        const now = new Date().toLocaleTimeString();
        setTime(now);
    }

    // date
    function generateDate(date) {
        return date.getFullYear()+'/'+(date.getMonth()+1)+'/'+ date.getDate();
    }

    const date = new Date();

    // stopwatch
    const [seconds, setSeconds] = useState(0);
    const [stopWatch, setStopWatch] = useState();
    const [pause, setPause] = useState(true);

    function parseTime(time) {
        let hours   = Math.floor(time / 3600);
        let minutes = Math.floor((time - (hours * 3600)) / 60);
        let seconds = time- (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;

    }

    React.useEffect(()=> {
        setStopWatch(parseTime(seconds));
    }, [seconds]);

    useInterval(() => {
        setSeconds(seconds+1);
    }, !pause ? 1000 : null);

    function clickPause() {
        setPause(!pause)
    }

    function clickClear() {
        setPause(true);
        setSeconds(0);
    }

    return (
        <div className="time-section">
            <div className="date-And-Time">
                <h3>{generateDate(date)}</h3>
                <h3>{time}</h3>
            </div>
            <div className="stopwatch">
                <h3>{stopWatch}</h3>
                <button className="btn" onClick={clickPause}>{pause? <i className="far fa-play-circle"></i>:<i className="far fa-pause-circle"></i>}</button>
                <button className="btn" onClick={clickClear}><i className="far fa-stop-circle"></i></button>
            </div>
        </div>
    )
}

export default Time;