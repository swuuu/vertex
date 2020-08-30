import React, {useState, useRef, createRef} from "react";
import CreateUniTask from "./CreateUniTask";
import UniTask from "./FormComponents/UniTask";

import { gsap, TweenLite } from "gsap";
import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

function App(){

    // taskList state: an array containing the objects of each task
    // tasks state: an array containing the DOM nodes of the objects

    // UNIVERSITY TASKS: adds the object to an array, which will be used to render the tasks
    const [taskList, setTaskList] = useState(
        localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []
    );

    // storing it in localStorage
    React.useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(taskList));
    }, [taskList]);

    //adding a task to taskList
    function addUniTaskInfo(obj) {
        setTaskList(prevValue => {
            return [obj, ...prevValue];
        });
    }

    //removing a task from taskList
    function deleteUniTaskInfo(idToElim) {
        setTaskList(prevValue => {
            return prevValue.filter((task)=> {return idToElim !== task.keyID})
        });
    }

    // --------------------------- making the UniTasks draggable ---------------------------
    let rowSize = 100;
    let container = useRef();
    let [lengthOfTasks, setLengthOfTasks] = useState(taskList.length);
    const [tasks, setTasks] = useState(Array.from({length: lengthOfTasks}, () => createRef()));
    let sortables;
    React.useEffect(()=>{
        sortables = tasks.map(dragging);
    }, []);

    // if taskList is rendered/ a new task has been added/ deleted , then modify lengthOfTasks
    React.useEffect(() => {
        setLengthOfTasks(taskList.length);
    }, [taskList]);

    // after lengthOfTasks has been modified, update the ref list: tasks
    React.useEffect(() => {
        setTasks(Array.from({length: lengthOfTasks}, () => createRef()));
    }, [lengthOfTasks]);

    // after tasks has been modified, update the sortables array;
    React.useEffect(() => {
        sortables = tasks.map(dragging);
    }, [tasks]);


    function changeIndex(item, to) {
    
        // Change position in array
        moveArray(sortables, item.index, to);
          
        // Change element's position in DOM. Not always necessary. Just showing how.
        if (to === lengthOfTasks - 1) {
          container.current.appendChild(item.element);    
        } else {    
          var i = item.index > to ? to : to + 1;
          container.current.insertBefore(item.element, container.current.children[i]);
        }    
          
        // Set index for each sortable
        sortables.forEach((sortable, index) => sortable.setIndex(index));
    }
    
    function dragging(element, index) {
        let content = element.current;    
        
        var animation = TweenLite.to(content, 0.3, {
            boxShadow: "rgba(0,0,0,0.2) 0px 16px 32px 0px",
            force3D: true,
            scale: 1.1,
            paused: true
        });

        var dragger = new Draggable(content, {        
            onDragStart: downAction,
            onRelease: upAction,
            onDrag: dragAction,
            cursor: "inherit",    
            type: "y",
        });

        var sortable = {
            dragger:  dragger,
            element:  content,
            index:    index,
            setIndex: setIndex
        };

        TweenLite.set(content, { y: index * rowSize });

        function setIndex(index) {
    
            sortable.index = index;    
            // Don't layout if you're dragging
            if (!dragger.isDragging) layout();
        }

        function downAction() {
            animation.play();
            this.update();
        }

        function dragAction() {
            // Calculate the current index based on element's position
            let index = clamp(Math.round(this.y / rowSize), 0, lengthOfTasks - 1);
            
            if (index !== sortable.index) {
              changeIndex(sortable, index);
            }
        }

        function upAction() {
            animation.reverse();
            layout();
        }

        function layout() {    
            TweenLite.to(content, 0.3, { y: sortable.index * rowSize });  
        }

        return sortable;
    }

    function moveArray(array, from, to) {
        // inner array.splice takes the task in the array to move, and the outer array.splice will place it at position "to"
        const newArray = [...array.splice(to, 0, array.splice(from, 1)[0])];
        setTasks(newArray);
    }

    function clamp(value, a, b) {
        // "value < a ? a" --> means if true, then place the task at the front, else 
        // if "value > b" --> place it at the end, else place it at value = index
        return value < a ? a : (value > b ? b : value);
    }
 
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 col-md-6 d-flex justify-content-center ">
                    <div className="tasks-container" ref={container}>
                        {taskList.map((task, index) => {
                            return <UniTask key={task.keyID} keyID={task.keyID} ref={tasks[index]} courseName={task.courseName} uniTaskToDo={task.uniTaskToDo} method={task.method} graded={task.graded} onRepeat={task.onRepeat} delete={deleteUniTaskInfo}/>
                        })}
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 d-flex justify-content-center">
                    <CreateUniTask  addUniTaskInfo={addUniTaskInfo}/>
                </div>
            </div>
        </div>
    )
}

export default App;