import React, { useState } from 'react'; 
import Collapsible from 'react-collapsible';

function LeaderBoard(props) {
    const [numOfPrizes, setNumOfPrizes] = useState(1);
    const [editing, setEditing] = useState(false);
    const [T1Prizes, setT1Prizes] = useState([]);
    const [T2Prizes, setT2Prizes] = useState([]);
    const [T3Prizes, setT3Prizes] = useState([]);
    //prizes are added to its array of prizes according to its tier 
    const addT1Prize = () => {
        setNumOfPrizes(numOfPrizes + 1);
        setT1Prizes(oldT1Prizes => [...oldT1Prizes, { name: 'Double Click Tier 1 to Edit', isDeleted: false, points: 0, id: { numOfPrizes } }]);
    };

    const addT2Prize = () => {
        setNumOfPrizes(numOfPrizes + 1);
        setT2Prizes(oldT2Prizes => [...oldT2Prizes, { name: 'Double Click Tier 2 to Edit', isDeleted: false, points: 0, id: { numOfPrizes }  }]);
    };

    const addT3Prize = () => {
        setNumOfPrizes(numOfPrizes + 1);
        setT3Prizes(oldT3Prizes => [...oldT3Prizes, { name: 'Double Click Tier 3 to Edit', isDeleted: false, points: 0, id: { numOfPrizes } }]);
    };
    //prize name and points will be edited and set as new default
    const editT1 = (name, newName, newPoints) => {
        const T1Copy = [...T1Prizes];
        var index = T1Prizes.findIndex(entry => entry.name === name);
        T1Copy[index].name = newName;
        T1Copy[index].points = newPoints;
        setT1Prizes(T1Copy);
    };
    const editT2 = (name, newName, newPoints) => {
        const T2Copy = [...T2Prizes];
        var index = T2Prizes.findIndex(entry => entry.name === name);
        T2Copy[index].name = newName;
        T2Copy[index].points = newPoints;
        setT2Prizes(T2Copy);
    };

    const editT3 = (name, newName, newPoints) => {
        const T3Copy = [...T3Prizes];
        var index = T3Prizes.findIndex(entry => entry.name === name);
        T3Copy[index].name = newName;
        T3Copy[index].points = newPoints;
        setT3Prizes(T3Copy);
    };
    //prizes declared as being deleted 
    const deleteT1 = (id) => {
        const T1Copy = [...T1Prizes];
        var index = T1Prizes.findIndex(entry => entry.id === id);
        T1Copy[index].isDeleted = true;
        setT1Prizes(T1Copy);
    };
    const deleteT2 = (id) => {
        const T2Copy = [...T2Prizes];
        var index = T2Prizes.findIndex(entry => entry.id === id);
        T2Copy[index].isDeleted = true;
        setT1Prizes(T2Copy);
    };
    const deleteT3 = (id) => {
        const T3Copy = [...T3Prizes];
        var index = T3Prizes.findIndex(entry => entry.id === id);
        T3Copy[index].isDeleted = true;
        setT3Prizes(T3Copy);
    };
    //page will toggle between edit mode and final display mode
    const edit = () => {
        setEditing(!editing);
    }
    
    if (editing) {
        return (
            <>
                <h1>Prize Board </h1>
                <h3 onDoubleClick={edit}>Tier 1</h3>
                <Collapsible trigger={'\u032D'} open={true}>
                    <button onClick={addT1Prize}>Add Prize </button>
                    {T1Prizes.map(entry => {
                        if (entry.isDeleted) {
                            return null
                        }   
                        return (
                            <div>
                                Prize: <input type="text" placeholder={'Prize Name'} onChange={e => editT1(entry.name, e.target.value)} />
                                Points: <input type="number" placeholder={'Number of Points'} onChange={e => editT1(entry.name, entry.name, e.target.value)} />
                            </div>
                        )
                    }
                    )}
                </Collapsible>

                <h3 onDoubleClick={edit}> Tier 2</h3>
                <Collapsible trigger={'\u032D'} open={true}>
                    <button onClick={addT2Prize}>Add Prize </button>
                    {T2Prizes.map(entry => {
                        if (entry.isDeleted) {
                            return null
                        }   
                        return (
                            <div>
                                Prize: <input type="text" placeholder={'Prize Name'} onChange={e => editT2(entry.name, e.target.value, entry.points)} />
                                Points: <input type="number" placeholder={'Number of Points'} onChange={e => editT2(entry.name, entry.name, e.target.value)} />
                            </div>
                        )
                    }
                    )}
                </Collapsible>

                <h3 onDoubleClick={edit}> Tier 3</h3>
                <Collapsible trigger={'\u032D'} open={true}>
                    <button onClick={addT3Prize}>Add Prize </button>
                    {T3Prizes.map(entry => {
                        if (entry.isDeleted) {
                            return null
                        }   
                        return (
                            <div>
                                Prize: <input type="text" placeholder={'Prize Name'} onChange={e => editT3(entry.name, e.target.value)} />
                                Points: <input type="number" placeholder={'Number of Points'} onChange={e => editT3(entry.name, entry.name, e.target.value)} />
                            </div>
                    )}
                    )}
                </Collapsible>   
            </>
            )     
    }

    return (
       
        <div>
            <h1>Prize Board </h1>
            <div>
            <h3 onDoubleClick={edit} >Tier 1</h3>
            <Collapsible trigger={'\u032D'} open={true}>
                <button onClick={addT1Prize}>Add Prize</button>
                {T1Prizes.map(entry => {
                    if (entry.isDeleted) {
                        return null
                    }   
                    return (
                        <ul id = "prize">
                            <li onClick={() => { deleteT1(entry.id) }}> {entry.name}</li>
                            <li id = "right">{entry.points} Pts</li>
                        </ul>
                    )
                }
                )}
            </Collapsible>
            </div>

            <div>
            <h3 onDoubleClick={edit}> Tier 2</h3>
            <Collapsible trigger={'\u032D'} open={true}>
                <button onClick={addT2Prize}>Add Prize </button>
                {T2Prizes.map(entry => {
                    if (entry.isDeleted) {
                        return null
                    }
                    return (
                        <ul id="prize">
                            <li onClick={() => { deleteT2(entry.id) }}> {entry.name}</li>
                            <li id="right">{entry.points} Pts</li>
                        </ul>
                    )
                }
                )}
            </Collapsible>
            </div>

            <div>
            <h3 onDoubleClick={edit}> Tier 3</h3>
            <Collapsible trigger={'\u032D'} open={true}>
                <button onClick={addT3Prize}>Add Prize </button>
                {T3Prizes.map(entry => {
                    if (entry.isDeleted) {
                        return null
                    }
                    return (
                        <ul id="prize">
                            <li onClick={() => { deleteT3(entry.id) }}> {entry.name}</li>
                            <li id="right">{entry.points} Pts</li>
                        </ul>
                    )
                }
                )}
            </Collapsible>
             </div>
        </div>
    );
}
export default LeaderBoard;
