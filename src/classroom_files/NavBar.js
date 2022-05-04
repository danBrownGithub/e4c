import React from 'react';
import { NavLink as Link } from 'react-router-dom';
import SubmitButton   from '../SubmitButton';
import UserStore      from '../stores/UserStore';


// TODO: Insert functional login button

class NavBar extends React.Component {

    async doLogout() {
        console.log("logging out");
        try {
          // Checks if the user has logged out successfully (/logout API endpoint)
          // modify /logout fetch request to be http://127.0.0.1/8080/logout ?
          let res = await fetch('http://127.0.0.1:8080/logout', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          });
    
          // Calls the function to check if user logged out
          let result = await res.status;
    
          // User has successfully logged out
          if (result && result === 200) {
            UserStore.isLoggedIn = false;
            UserStore.username = '';                // Reset username being stored
            UserStore.password = '';
          }
    
        }
    
      
        // Catches all errors with validating user logout
        catch(e) {
          console.log(e)                            // Log error
        }
    
      }

    render() {
    return (
        <>
            <div className="button">
              <div className="logoutButton">
                <SubmitButton

                  // Label on the button
                  text = 'Logout'
                  // Clicking initiates the login process
                  onClick = { () => this.doLogout() }
                  
                />
              </div>
            </div>

        <ul>
            <li> EFC </li>
                <Link to='/Classroom' id="navClass" > Classroom </Link>
                <Link to ='/LeaderBoard' id = "navClass"> Prize Board</Link>
            </ul>
        </>
        
        )
    }
}

export default NavBar;
