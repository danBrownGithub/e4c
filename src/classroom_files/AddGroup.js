import React, { useState } from 'react';

function AddGroup(props) {
    const [numPoints, setNumPoints] = useState(props.points);
    const [isDisplayed, setIsDisplayed] = useState(false);
    //point is added to the group and points updated
    const addPoints = () => {
        setNumPoints(numPoints + 1);
        props.updatePoints(props.name, numPoints);
    }
    //point is subtracted from the group and the points are updated
    const subPoints = () => {
        setNumPoints(numPoints - 1);
        props.updatePoints(props.name, numPoints);
    }
    //when group name is clicked, the points will be hidden or displayed
    const display = () => {
        setIsDisplayed(!isDisplayed);
    }
    //group points will show
    if (isDisplayed) {
        return(
            <div className="Groups">

                <h3 onClick={display}> {props.name}</h3>
                <button id="plus" onClick={() => addPoints()} >+</button>
                <button id="minus" onClick={() => subPoints()}>-</button>
                <p>Points: {props.points}</p>
            </div>
           )
    }
    //group points will not show
    return (
        <div className="Groups">
            <h3 onClick={display}> {props.name}</h3>
            <button id="plus" onClick={() => addPoints()} >+</button>
            <button id="minus" onClick={() => subPoints()}>-</button> 
        </div>
        
    );
}

export default AddGroup;