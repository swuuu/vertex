import React, {useState} from "react";

function Row(props) {
    
    // application in the child component is the same as row in the parent component
    const [application, setApplication] = useState({
        keyID: props.keyID,
        name: props.nameKey,
        location: props.locationKey,
        date: props.dateKey,
        position: props.positionKey,
        method: props.methodKey,
        stage: props.stageKey,
        nextSteps: props.nextStepsKey
    });

    function updateApplication(event) {
        let col = event.target.name;
        let newValue = event.target.value;
        setApplication(prev => {
            if (col==="name") {
                return {
                    keyID: prev.keyID,
                    name: newValue,
                    location: prev.location,
                    date: prev.date,
                    position: prev.position,
                    method: prev.method,
                    stage: prev.stage,
                    nextSteps: prev.nextSteps
                }
            } else if (col==="location") {
                return {
                    keyID: prev.keyID,
                    name: prev.name,
                    location: newValue,
                    date: prev.date,
                    position: prev.position,
                    method: prev.method,
                    stage: prev.stage,
                    nextSteps: prev.nextSteps
                }
            } else if (col==="date") {
                return {
                    keyID: prev.keyID,
                    name: prev.name,
                    location: prev.location,
                    date: newValue,
                    position: prev.position,
                    method: prev.method,
                    stage: prev.stage,
                    nextSteps: prev.nextSteps
                }
            } else if (col==="position") {
                return {
                    keyID: prev.keyID,
                    name: prev.name,
                    location: prev.location,
                    date: prev.date,
                    position: newValue,
                    method: prev.method,
                    stage: prev.stage,
                    nextSteps: prev.nextSteps
                }
            } else if (col==="method") {
                return {
                    keyID: prev.keyID,
                    name: prev.name,
                    location: prev.location,
                    date: prev.date,
                    position: prev.position,
                    method: newValue,
                    stage: prev.stage,
                    nextSteps: prev.nextSteps
                }
            } else if (col==="stage") {
                return {
                    keyID: prev.keyID,
                    name: prev.name,
                    location: prev.location,
                    date: prev.date,
                    position: prev.position,
                    method: prev.method,
                    stage: newValue,
                    nextSteps: prev.nextSteps
                }
            } else {
                return {
                    keyID: prev.keyID,
                    name: prev.name,
                    location: prev.location,
                    date: prev.date,
                    position: prev.position,
                    method: prev.method,
                    stage: prev.stage,
                    nextSteps: newValue
                }
            }
        })
    }

    React.useEffect(()=> {
        props.updateRow(application, application.keyID);
    }, [application])

    // delete functionality
    const [displayDelete, setDisplayDelete] = useState(props.delete);

    React.useEffect(()=>{
        setDisplayDelete(props.delete)
    }, [props.delete])

    let displayShrinkRow = displayDelete ? "display-shrink-row" : "";
    let displayDeleteButton = displayDelete ? "display-delete-button" : "";

    function deleteRow() {
        props.deleteRow(application.keyID);
    }

    return (
        <div className="custom-row-container">
            <div className={`custom-row ${displayShrinkRow}`}>
                <div className="rectangle">
                    <textarea name="name" value={application.name} type="text" onChange={updateApplication}>{application.name}</textarea>
                </div>
                <div className="rectangle">
                    <textarea name="location" value={application.location} type="text" onChange={updateApplication}>{application.location}</textarea>
                </div>
                <div className="rectangle">
                    <textarea name="date" value={application.date} type="text" onChange={updateApplication}>{application.date}</textarea>
                </div>
                <div className="rectangle">
                    <textarea name="position" value={application.position} type="text" onChange={updateApplication}>{application.position}</textarea>
                </div>
                <div className="rectangle">
                    <textarea name="method" value={application.method} type="text" onChange={updateApplication}>{application.method}</textarea>
                </div>
                <div className="rectangle">
                    <textarea name="stage" value={application.stage} type="text" onChange={updateApplication}>{application.stage}</textarea>
                </div>
                <div className="rectangle">
                    <textarea name="nextSteps" value={application.nextStepsKey} type="text" onChange={updateApplication}>{application.nextStepsKey}</textarea>
                </div>
            </div>
            <button type="button" className={`btn delete-button ${displayDeleteButton}`} onClick={deleteRow}><i className="fas fa-trash"></i></button>
        </div>
    )
}

export default Row;