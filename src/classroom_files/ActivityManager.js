import React, { useState} from 'react';
import Tasks from './Tasks.js';
import trash from './trash.svg';

function ActivityManager(props) {
    const [numOfTasks, setNumOfTasks] = useState(1);
    const [theTasks, setTheTasks] = useState([]);
    //function to add task to task array 
    const addTask = () => {
        setNumOfTasks(numOfTasks + 1);
        setTheTasks(oldTasks => [...oldTasks, { taskID: `Task ${numOfTasks}`, name: '' , desc: '', pts: 0, isDeleted: false}]);
    };
    //setting input as new default so tasks display even after not being displayed
    const setNewDefault= (ID, name, desc, pts) => {
        const copy = JSON.parse(JSON.stringify(theTasks));//[...theTasks];
        var index = copy.findIndex(entry => entry.taskID === ID);
        copy[index].name = name;
        copy[index].desc = desc;
        copy[index].pts = pts;
        setTheTasks(copy);
    }
    // removing task from being displayed
    const deleteTask = (ID) => {
        const tasksCopy = [...theTasks];
        var index = theTasks.findIndex(entry => entry.taskID === ID);
        tasksCopy[index].isDeleted = true;
        setTheTasks(tasksCopy);
    };
    //class activity manager will not be displayed
    if (!props.isActive) {
        return null
    }
    return (
        <>
        <div className = "actMan">
            <h1> {props.name} Tasks</h1>
            <button onClick={addTask} className="AMButton">Add Task </button>
        </div>
        <div>
            {theTasks.map(entry => {
                if (entry.isDeleted) {
                    return null
                }
                return (
                    <>
                        <img src={trash} id="AMTrash" onClick={() => { deleteTask(entry.taskID) }} alt="delete Task" />
                        <br/>
                        <Tasks
                            taskID={entry.taskID}
                            taskName={entry.name}
                            taskDesc={entry.desc}
                            taskPts={entry.pts}
                            newDefault={setNewDefault}
                        />  
                    </>
                )}
                )}
        
            </div>
        </>
        )
};
export default ActivityManager;
