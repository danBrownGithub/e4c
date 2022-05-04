import React, { useState} from 'react';
import AddGroup from './AddGroup.js';
import Collapsible from 'react-collapsible';
import trash from './trash.svg';

function AddSection(props) {
    const [numOfGroups, setNumOfGroups] = useState(1);
    const [theGroup, setTheGroup] = useState([]);
    //group is added to array of groups within the section
    const addGroups = () => {
        setNumOfGroups(numOfGroups + 1);
        setTheGroup(oldGroup => [...oldGroup, { name: `Group ${numOfGroups}`, isDeleted: false, points: 0}]);
    };
    //group is declared as being deleted
    const deleteGroup = (name) => {
        const groupCopy = [...theGroup];
        var index = theGroup.findIndex(entry => entry.name === name);
        groupCopy[index].isDeleted = true;
        setTheGroup(groupCopy);
    };
    //the points a group has is now set as its default amount of points
    const setNewPoints = (name, points) => {
        const copy = [...theGroup];
        var index = copy.findIndex(entry => entry.name === name);
        copy[index].name = name;
        copy[index].points = points;
        setTheGroup(copy);
    }
    //sorts the group array from most points to least points
    const sortedGroup = theGroup.sort((a, b) => {
        if (a.points > b.points) {
            return -1;

        }
        else {
            return 1;
        }
    }
        )
    //groups will display based on their points
    return (
        <div className="sections">
            <h3> {props.name}</h3>           
            <Collapsible trigger={'\u032D'} open={true}>
                <button onClick={addGroups}>Add Group </button>

                {sortedGroup.map(entry => {
                    if (entry.isDeleted) {
                        return null
                    }
                    return (
                        <>
                            <div>
                                <img src={trash} id="trash" onClick={() => { deleteGroup(entry.name) }} alt="delete Group" />
                                <AddGroup key={entry.name} name={entry.name} points={entry.points} updatePoints={setNewPoints} />
                            </div> 
                        </>
                    )}
                    )}
            </Collapsible>
       </div>
    );
}

export default AddSection;
