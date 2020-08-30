import React, {useState} from "react";

function UniTaskCheckboxs(props) {
    
    // takes in objectKey, the name of a key in an object of a parent component
    // takes in captureTaskInfo, a function in the parent component that receives objectKey and the inputValue
    const objectKey = props.objectKey;

    const [checked, setChecked] = useState({Revision: false, Exercise: false, Assignment:false, Reading: false});
    function changeChecked(event) {

        const uniTask = event.target.name;
        setChecked(() => {
            if (uniTask === "Revision") {
                return {
                    Revision: true,
                    Exercise: false,
                    Assignment: false,
                    Reading: false
                }
            } else if (uniTask === "Exercise") {
                return {
                    Revision: false,
                    Exercise: true,
                    Assignment: false,
                    Reading: false
                }
            } else if (uniTask === "Assignment") {
                return {
                    Revision: false,
                    Exercise: false,
                    Assignment: true,
                    Reading: false
                }
            } else  {
                return {
                    Revision: false,
                    Exercise: false,
                    Assignment: false,
                    Reading: true
                }
            } 
        });
        
        props.captureTaskInfo(objectKey, uniTask);

    }
    
    // "other" state

    const [otherTask, setOtherTask] = useState("");
    function changeOtherTask(event) {
        const newValue = event.target.value;
        setOtherTask(() => {
            return newValue;
        });
        setChecked(()=>{
            return {
                Revision: false,
                Exercise: false,
                Assignment: false,
                Reading: false
            }
        });
    }

    React.useEffect(()=> {
        props.captureTaskInfo(objectKey, otherTask);
    }, [otherTask])


    // resetting checkboxes and inputs 
    const [reset, setReset] = useState(props.reset);
    React.useEffect( ()=> {
        if (reset !== props.reset) {
            setChecked(()=>{
                return {
                    Revision: false,
                    Exercise: false,
                    Assignment: false,
                    Reading: false
                }
            });
            setOtherTask("");
            props.setResetToFalse();
        }
    }, [props.reset]);


    return (
        <div>
            <div className="uni-task-checkbox  row">
                <div className="col-lg-6 col-md-6">
                    <input className="uni-task-checkbox form-check-input" type="checkbox" name="Revision"  onChange={changeChecked} checked={checked.Revision}/><label>Revision</label>
                </div>
                <div className="col-lg-6 col-md-6">
                    <input className="uni-task-checkbox form-check-input" type="checkbox" name="Exercise"  onChange={changeChecked}  checked={checked.Exercise}/><label>Exercise</label>
                </div>
                <div className="col-lg-6 col-md-6">
                    <input className="uni-task-checkbox form-check-input" type="checkbox" name="Assignment"  onChange={changeChecked}  checked={checked.Assignment}/><label>Assignment</label>
                </div>
                <div className="col-lg-6 col-md-6">
                    <input className="uni-task-checkbox form-check-input" type="checkbox" name="Reading"  onChange={changeChecked} checked={checked.Reading}/><label>Reading</label>
                </div>
            </div>
            <div className="row">
                <label className="col-lg-2 col-md-2 col-sm-2">Other</label>
                <div className="col-lg-10 col-md-10 col-sm-10 user-input">
                    <input  placeholder="Other" name="Other" onChange={changeOtherTask} value={otherTask} type="text"/>
                </div>
            </div>
        </div>
    )
}

export default UniTaskCheckboxs;