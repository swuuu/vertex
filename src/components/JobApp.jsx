import React, {useState} from "react";
import JobApplLabels from "./JobApplComponents/JobApplLabels";
import Row from "./JobApplComponents/Row";
var uniqid = require('uniqid');


function JobApp() {

    const [rows, setRows] = useState(localStorage.getItem("rows") ? JSON.parse(localStorage.getItem("rows")) : [{
        keyID: uniqid(),
        name: "",
        location: "",
        date: "",
        position: "",
        method: "",
        stage: "",
        nextSteps: ""
    }]);

    function addRow(){

        const newRow = {
            keyID: uniqid(),
            name: "",
            location: "",
            date: "",
            position: "",
            method: "",
            stage: "",
            nextSteps: ""
        }

        setRows(prev => {
            return [newRow, ...prev]
        });
    }

    // storing it in localStorage
    React.useEffect(() => {
        localStorage.setItem("rows", JSON.stringify(rows));
    }, [rows]);

    function deleteOneRow(idToElim){
        setRows(prevValue => {
            return prevValue.filter((row)=> {return idToElim !== row.keyID})
        });
    }

    function deleteAllRows(){
        setRows([{
            keyID: uniqid(),
            name: "",
            location: "",
            date: "",
            position: "",
            method: "",
            stage: "",
            nextSteps: ""
        }])
    }

    function updateRow(update, ID){
        setRows(
            rows.map((row)=>{
                return row.keyID === ID ? update : row;
            })
        );
    }

    // display delete option
    const [displayDelete, setDisplayDelete] = useState(false);

    function changeDisplayDelete() {
        setDisplayDelete(prev => {return !prev});
    }

    return (
        <div className={`table`}>
            <JobApplLabels />
            {rows.map((row => {
                return <Row
                    key={row.keyID}
                    keyID={row.keyID}
                    nameKey={row.name}
                    locationKey={row.location}
                    dateKey={row.date}
                    positionKey={row.position}
                    methodKey={row.method}
                    stageKey={row.stage}
                    nextStepsKey={row.nextSteps}
                    updateRow={updateRow}
                    delete={displayDelete}
                    deleteRow={deleteOneRow}
                />}))
            }
            <div className="buttons-row">
                <button type="button" onClick={addRow} className="btn job-app-button"><i className="fas fa-plus-circle"></i></button>
                <button type="button" onClick={changeDisplayDelete} className="btn job-app-button">{displayDelete? <i className="fas fa-times-circle times-circle-icon"></i> : <i className="fas fa-minus-circle"></i>}</button><br />
                {displayDelete? <button type="button" className="btn btn-outline-light" onClick={deleteAllRows}>Delete All Rows</button> : null}
            </div>
        </div>
    )
}

export default JobApp;