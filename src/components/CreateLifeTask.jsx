import React, {useState, useEffect} from "react";
import TextInput from "./FormComponents/TextInput";
import BooleanCheckbox from "./FormComponents/BooleanCheckbox";
var uniqid = require('uniqid');


function CreateLifeTask(props) {

    const [taskInfo, setTaskInfo] = useState({lifeTaskTitle: "", lifeTaskDetails:"" ,onRepeat: false, completed: false});

    const [isReset, setReset] = useState(false);
    function setResetToFalse(){
        setReset(false);
    }

    function captureTaskInfo(type, info) {
        setTaskInfo((prevValue) => {
            if (type==="lifeTaskTitle") {
                return {
                    keyID: uniqid(),
                    lifeTaskTitle: info,
                    lifeTaskDetails: prevValue.lifeTaskDetails,
                    onRepeat: prevValue.onRepeat,
                    completed: false
                }
            } else if (type==="lifeTaskDetails") {
                return {
                    keyID: uniqid(),
                    lifeTaskTitle: prevValue.lifeTaskTitle,
                    lifeTaskDetails: info,
                    onRepeat: prevValue.onRepeat,
                    completed: false
                }
            } else {
                return {
                    keyID: uniqid(),
                    lifeTaskTitle: prevValue.lifeTaskTitle,
                    lifeTaskDetails: prevValue.lifeTaskDetails,
                    onRepeat: info,
                    completed: false
                }
            }
        });
    }

    function handleClick(event) {
        props.addLifeTaskInfo(taskInfo);
        setReset(true);
        event.preventDefault();
    }

    // hiding/displaying the form

    const [displayForm, setDisplayForm] = useState(false)
    
    function display(event) {
        event.preventDefault();
        setDisplayForm(!displayForm);
    }

    const isDisplayOn = displayForm? "display-life-form" : "hide-life-form";

    return (
        <form className="create-life-task">
            <h4>LIFE</h4>
            {displayForm? null : <button className="btn" onClick={display}><i className="fas fa-angle-down"></i></button>}
            <div className={`${isDisplayOn}`}>
                <div className="row">
                    <label className="text-input-label col-lg-3 col-md-3 col-sm-3 d-flex justify-content-start" >Task Title</label>
                    <div className="col-lg-9 col-md-9 col-sm-9">
                        <TextInput  placeholderName="Task Title" objectKey="lifeTaskTitle" captureTaskInfo={captureTaskInfo} reset={isReset} setResetToFalse={setResetToFalse}/>
                    </div>
                </div>
                <div className="row">
                    <label className="text-input-label col-lg-3 col-md-3 col-sm-3 d-flex justify-content-start" >Details</label>
                    <div className="col-lg-9 col-md-9 col-sm-9">
                        <TextInput  placeholderName="Details" objectKey="lifeTaskDetails" captureTaskInfo={captureTaskInfo} reset={isReset} setResetToFalse={setResetToFalse}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-2 col-md-2 col-sm-2">
                        <BooleanCheckbox  name="On Repeat" objectKey="onRepeat" captureTaskInfo={captureTaskInfo} reset={isReset} setResetToFalse={setResetToFalse}/>
                    </div>
                </div>
                <button className="btn btn-outline-light" onClick={handleClick}>Add</button> <br/>
                <button className="btn" onClick={display}><i className="fas fa-angle-up"></i></button>
            </div>
        </form>
    );
}   

export default CreateLifeTask;