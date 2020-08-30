import React, {useState} from "react";
import TextInput from "./FormComponents/TextInput";
import BooleanCheckbox from "./FormComponents/BooleanCheckbox";
import UniTaskCheckboxs from "./FormComponents/UniTaskCheckboxs";
var uniqid = require('uniqid');

function CreateUniTask(props) {

    // taskInfo is an object containing all the information to create a university task
    // Its keys are: 1) courseName (String) 2) uniTaskToDo (String) 3) method (String) 4) onRepeat (Boolean)
    // A key name will be sent to a child component

    const [taskInfo, setTaskInfo] = useState({courseName:"", uniTaskToDo: "", method: "", graded: false ,onRepeat: false});

    // reset will be set to true once the user hits the add button, which will erase the values on the screen of the form

    const [isReset, setReset] = useState(false);
    
    function setResetToFalse(){
        setReset(false);
    }

    // captures information from each of the components
    //to-do: see if es6 key variable can be used to shorten this function
    function captureTaskInfo(type, info) {

        setTaskInfo(prevValue => {
            if (type === "courseName") {
                return {
                    keyID: uniqid(),
                    courseName: info,
                    uniTaskToDo: prevValue.uniTaskToDo,
                    method: prevValue.method,
                    graded: prevValue.graded,
                    onRepeat: prevValue.onRepeat
                }
            } else if (type === "uniTaskToDo") {
                return {
                    keyID: uniqid(),
                    courseName: prevValue.courseName,
                    uniTaskToDo: info,
                    method: prevValue.method,
                    graded: prevValue.graded,
                    onRepeat: prevValue.onRepeat
                }
            } else if (type === "method") {
                return {
                    keyID: uniqid(),
                    courseName: prevValue.courseName,
                    uniTaskToDo: prevValue.uniTaskToDo,
                    method: info,
                    graded: prevValue.graded,
                    onRepeat: prevValue.onRepeat
                }
            } else if (type === "graded") {
                return {
                    keyID: uniqid(),
                    courseName: prevValue.courseName,
                    uniTaskToDo: prevValue.uniTaskToDo,
                    method: prevValue.method,
                    graded: info,
                    onRepeat: prevValue.onRepeat
                }
            } else {
                return {
                    keyID: uniqid(),
                    courseName: prevValue.courseName,
                    uniTaskToDo: prevValue.uniTaskToDo,
                    method: prevValue.method,
                    graded: prevValue.graded,
                    onRepeat: info
                }
            }
        });
    }

    function handleClick(event) {
        
        // adds the object to an array, which will be used to render the tasks
        props.addUniTaskInfo(taskInfo);
        setReset(true);
        event.preventDefault();
    }

    // In the to-do list, 
    // 1) TextInput:  Course Name
    // 2) UniTaskCheckboxs: Which task is it: Revision, Exercise, Assignment, Reading, other...
    // 3) TextInput: The method used: notes, reading, etc...
    // 4) BooleanCheckbox: Should the task be on repeat?
    // potential additional features: A deadline option

    return (
        <form className="create-uni-task">
            <h4>UNIVERSITY</h4>
            <div className="row">
                <label className="text-input-label col-lg-2 col-md-2 col-sm-2" >Course Name</label>
                <div className="col-lg-10 col-md-10 col-sm-10">
                    <TextInput  placeholderName="Course Name" objectKey="courseName" captureTaskInfo={captureTaskInfo} reset={isReset} setResetToFalse={setResetToFalse}/>
                </div>
            </div>
            <UniTaskCheckboxs  objectKey="uniTaskToDo" captureTaskInfo={captureTaskInfo} reset={isReset} setResetToFalse={setResetToFalse}/>
            <div className="row">
                <label className="col-lg-2 col-md-2 col-sm-2" >Details</label>
                <div className="col-lg-10 col-md-10 col-sm-10">
                    <TextInput  placeholderName="Details" objectKey="method" captureTaskInfo={captureTaskInfo} reset={isReset} setResetToFalse={setResetToFalse}/>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2">
                    <BooleanCheckbox  name="Graded" objectKey="graded" captureTaskInfo={captureTaskInfo} reset={isReset} setResetToFalse={setResetToFalse}/>
                </div>
            </div> 
            <div className="row">
                <div className="col-lg-2 col-md-2 col-sm-2">
                    <BooleanCheckbox  name="On Repeat" objectKey="onRepeat" captureTaskInfo={captureTaskInfo} reset={isReset} setResetToFalse={setResetToFalse}/>
                </div>
            </div> 
            <button className="btn btn-outline-light" onClick={handleClick}>Add</button>
        </form>
    )

}

export default CreateUniTask;