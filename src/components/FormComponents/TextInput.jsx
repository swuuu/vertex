import React, {useState} from "react";

function TextInput(props) {

    // takes in props.placeholderName, which is the name of the input
    // takes in objectKey, the name of a key in an object of a parent component
    // takes in captureTaskInfo, a function in the parent component that receives objectKey and the inputValue

    const objectKey = props.objectKey;

    const [inputValue, setInputValue] = useState("");

    function UpdateValue(event) {
        const newValue = event.target.value;
        setInputValue(newValue);
    }

    React.useEffect(() => {
        props.captureTaskInfo(objectKey, inputValue);
    }, [inputValue]);

    // resetting when a new task is added
    const [reset, setReset] = useState(props.reset);
    React.useEffect(()=> {
        if (reset !== props.reset) {
            setInputValue("");
            // function that will received the objectKey and inputValue sent
            props.captureTaskInfo(objectKey, inputValue);
            // function from parent component that turns isReset back to false
            props.setResetToFalse();
        };   
    }, [props.reset]);





    return (
        <div><input placeholder={props.placeholderName} value={inputValue} onChange={UpdateValue}/></div>
    )
}

export default TextInput;