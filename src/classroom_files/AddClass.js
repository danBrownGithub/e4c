import React, { useState } from 'react';
import AddSection from './AddSection.js';
import Collapsible from 'react-collapsible';
import trash from './trash.svg';

function AddClass(props) {
    const [numOfSections, setNumOfSections] = useState(1);
    const [theSection, setTheSection] = useState([]);
    //function to add section to section array within a class
    const addSections = () => {
        setNumOfSections(numOfSections + 1);
        setTheSection(oldSection => [...oldSection, { name: `Section ${numOfSections}`, isDeleted: false }]);
    };
    //function to declare a section is deleted based on name
    const deleteSection = (name) => {  
        const sectionCopy = [...theSection];
        var index = theSection.findIndex(entry => entry.name === name);
        sectionCopy[index].isDeleted = true;
        setTheSection(sectionCopy);
    };
    
    return (
        <div className="classes">
            <h3 onClick={()=> props.toggle(props.name)}> {props.name} </h3>
            <Collapsible trigger={'\u032D'} open={true}>  
  
            <button onClick={addSections}> Add Section </button> 
            
                {theSection.map(entry => {
                    if (entry.isDeleted) {
                        return null
                    }    
                    return (
                        <>
                            <div>
                                <img src={trash} id="trash" onClick={() => deleteSection(entry.name)} alt="delete Section" />
                                <AddSection key={entry.name} name={entry.name} isDeleted={entry.isDeleted} />
                            </div>
                        
                        </>
                    )}
                    )}
            </Collapsible>
        </div>
        );
}

export default AddClass;
