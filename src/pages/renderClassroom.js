import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Classroom from '../classroom_files/Classroom.js';
import LeaderBoard from '../classroom_files/LeaderBoard.js';
import NavBar from '../classroom_files/NavBar.js';

class renderClassroom extends React.Component {
    render() {
        return (

            <Classroom />
            
        );
    }
}

export default renderClassroom;

/* 
                <Routes>
                    <Route path='../classroom_files/Classroom' element={<Classroom/>} />
                    <Route path='../classroom_files/LeaderBoard' element={<LeaderBoard />} />
                </Routes>
*/
