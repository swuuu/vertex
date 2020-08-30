import React, {useState} from "react";
import GradedTag from "./TaskTags/GradedTag";
import OnRepeatTag from "./TaskTags/OnRepeatTag";

function UniTask(props, ref) {
    // Receives courseName, uniTaskToDo, method, onRepeat as props

    // isDone will allow the UniTask to be crossed out
    const [isDone, setDone] = useState(false);

    function changeDone() {
        setDone(!isDone);
    }

    const done = isDone && "done";

    return (
        
        <div className={`task-box ${done}`} ref={ref} data-keyid={props.keyID}>
            <div className="uni-task-right">
                <div className="uni-task-check">
                    <div className="uni-task-check-container">
                        <i className="far fa-check-circle" onClick={changeDone}></i>
                    </div>
                </div>
                <div className="uni-task-info">
                    <h5>{props.courseName}: {props.uniTaskToDo}</h5>
                    <p>{props.method}</p>
                    {props.graded && <GradedTag />}
                    {props.onRepeat && <OnRepeatTag />}
                </div>
            </div>

            <div className="uni-task-left">
                <i className="far fa-times-circle" onClick={() => {props.delete(props.keyID)}}></i>
            </div>
        </div>
    )
}

const forwardUniTask = React.forwardRef(UniTask)

export default forwardUniTask;