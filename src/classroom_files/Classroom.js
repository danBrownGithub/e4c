import React, { useState } from 'react';
import AddClass from './AddClass.js';
import ActivityManager from './ActivityManager.js';
import trash from './trash.svg';

function Classroom() {
    const [numOfClasses, setNumOfClasses] = useState(1);
    const [theClass, setTheClass] = useState([]);
    //class added to class array
    const addClasses = () => {
        setNumOfClasses(numOfClasses + 1);
        setTheClass(oldClass => [...oldClass, { name: `Class ${numOfClasses}`, isActive: false, isDeleted: false }]);
    };
    //class is declared as being deleted
    const deleteClass = (name) => {
        const classCopy = [...theClass];
        var index = theClass.findIndex(entry => entry.name === name);
        classCopy[index].isDeleted = true;
        setTheClass(classCopy);
    };
    //the activity manager for each class will either be hidden or displayed, only one activity manager will be displayed at a time
    const toggle = (purple) => {
        const copy = [...theClass];
        var index = copy.findIndex(entry => entry.name === purple);

        copy[index].isActive = !copy[index].isActive;

        for (var i = 0; i < copy.length; i++) {
            if (i !== index) {
                copy[i].isActive = false;
            }
        }
        setTheClass(copy);
    };
    //left column will be the classes, sections, and groups; right column will be the activity manager
    return (
        <div className="row">
            <div className="colomnL">
                <br/>
                <button onClick={addClasses}> Add Class </button>
                
                {theClass.map(entry => {
                    if (entry.isDeleted) {
                        return null
                    }
                    return (
                        <>
                            <div>
                                <img src={trash} id="trash" onClick={() => deleteClass(entry.name)} alt="delete Class" />
                                <AddClass name={entry.name} toggle={toggle} />
                            </div>
                        </>
                    )
                }
                )}
            </div>
            <div className="columnR">
               
                {theClass.map(entry => {
                    return (
                        <>
                            <ActivityManager name={entry.name} isActive={entry.isActive} />
                        </>
                    )}
                )}
            </div>
        </div>
    )
}

export default Classroom;