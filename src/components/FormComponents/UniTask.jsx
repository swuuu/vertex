import React, {useState} from "react";
import GradedTag from "./TaskTags/GradedTag";
import OnRepeatTag from "./TaskTags/OnRepeatTag";

function UniTask(props, ref) {
    // Receives courseName, uniTaskToDo, method, onRepeat as props

    // isDone will allow the UniTask to be crossed out
    const [isDone, setDone] = useState(props.completed);

    function changeDone() {
        setDone(!isDone);
    }

    const done = isDone && "done";

    function cross() {
        const task = {
            keyID: props.keyID,
            courseName: props.courseName,
            uniTaskToDo: props.uniTaskToDo,
            method: props.method,
            graded: props.graded,
            onRepeat: props.onRepeat,
            completed: isDone
        }
        props.crossUniTask(task, task.keyID)
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
                    <h5>{props.courseName}: {props.uniTaskToDo}</h5>
                    <p>{props.method}</p>
                    {props.graded && <GradedTag />}
                    {props.onRepeat && <OnRepeatTag />}
                </div>
            </div>

            <div className="task-left">
                <i className="far fa-times-circle" onClick={() => {props.delete(props.keyID)}}></i>
            </div>
        </div>
    )
}

const forwardUniTask = React.forwardRef(UniTask)

export default forwardUniTask;