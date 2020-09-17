import React, {useState} from "react";
import OnRepeatTag from "./TaskTags/OnRepeatTag";

function LifeTask(props, ref) {

    const [isDone, setDone] = useState(props.completed);

    function changeDone() {
        setDone(!isDone);
    }

    const done = isDone && "done";

    function cross() {
        const task = {
            keyID: props.keyID,
            lifeTaskTitle: props.lifeTaskTitle,
            lifeTaskDetails: props.lifeTaskDetails,
            onRepeat: props.onRepeat,
            completed: isDone
        }
        props.crossLifeTask(task, task.keyID)
    }

    React.useEffect(()=>{
        cross();
    }, [isDone])

    return (
        
        <div className={`task-box ${done}`} ref={ref} data-keyid={props.keyID}>
            <div className="task-right">
                <div className="task-check">
                    <div className="task-check-container">
                        <i className="far fa-check-circle" onClick={changeDone}></i>
                    </div>
                </div>
                <div className="task-info">
                    <h5>{props.lifeTaskTitle}</h5>
                    <p>{props.lifeTaskDetails}</p>
                    {props.onRepeat && <OnRepeatTag />}
                </div>
            </div>

            <div className="task-left">
                <i className="far fa-times-circle" onClick={() => {props.delete(props.keyID)}}></i>
            </div>
        </div>
    )
}

const forwardLifeTask = React.forwardRef(LifeTask)

export default forwardLifeTask;