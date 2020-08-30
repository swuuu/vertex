import React, {useState} from "react";

function BooleanCheckbox(props) {

    // takes in props.name, which is the name of the checkbox
    // takes in objectKey, the name of a key in an object of a parent component
    // takes in captureTaskInfo, a function in the parent component that receives objectKey and the inputValue
    const objectKey = props.objectKey;
    const [isChecked, setChecked] = useState(false);

    function changeChecked() {
        setChecked(!isChecked);
    }

    React.useEffect(()=> {
        props.captureTaskInfo(objectKey, isChecked);
    }, [isChecked]);

    const [reset, setReset] = useState(props.reset);

    React.useEffect(() => {
        if (reset !== props.reset) {
            setChecked(false);
            props.setResetToFalse();
        }
    }, [props.reset])

    return (
        <div className="form-check" >
            <input className="form-check-input" type="checkbox" checked={isChecked} onChange={changeChecked} />
            <label className="boolean-checkbox-label">{props.name}</label>
        </div>
    )

}

export default BooleanCheckbox;