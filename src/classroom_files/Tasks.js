import React, { useState} from 'react';

function Tasks(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState(props.taskDesc);
    const [pts, setPts] = useState(props.taskPts);
    const [name, setName] = useState(props.taskName);

    //when submit button is clicked, the task is now displaying and default is set to what was submitted
    const submit = () => {
        setIsEditing(false);
        props.newDefault(props.taskID, name, description, pts);
    }
    //when edit button is clicked, user can edit the selected task
    const edit = () => {
        setIsEditing(true);
    }

    if (isEditing) {
        return(
            <>
                <div className="task">
                    <br></br>
                    <br></br>
                    <input type="text" placeholder="Task Name" onChange={e => setName(e.target.value)} />
                    <textarea rows="5" cols="20" type="text" value={description} placeholder="Task Description" onChange={e => setDescription(e.target.value)} /> 
                    <input type="number" placeholder="Task Points"  onChange={e => setPts(e.target.value)} />
                    <button onClick={submit}> Submit </button>
                </div>
            </>
            )
    }
    return (
        <div className="task">
            <br></br>
            <h5> {name} </h5>
            <p> {description}</p>
            <p> Points: {pts} </p>
            <button onClick={edit}> Edit </button>
        </div>
        )
}
export default Tasks;