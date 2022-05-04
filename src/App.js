import React          from 'react';
import { observer }   from 'mobx-react';
import UserStore      from './stores/UserStore';
import LoginForm      from './LoginForm';

// Import the multiple pages functionality
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the functionality for Nehemie's classroom
import Classroom      from './classroom_files/Classroom';
import LeaderBoard    from './classroom_files/LeaderBoard';
import NavigationBar  from './classroom_files/NavBar';

import AccountCreationForm from './AccountCreationForm';
import './App.css';


class App extends React.Component {


  // ===== CHECK USER LOGIN ===== //

  async componentDidMount() {

    try {
        // Checks if the user is logged in or not after app finishes loading (/isLoggedIn API endpoint)
        let res = await fetch('/isLoggedIn', {
          method: 'post',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });

        // Calls the function to check if user is logged in
        let result = await res.json();

        // User is successfully logged in, store user info in UserStore
        if (result && result.success) {
          UserStore.loading = false;
          UserStore.isLoggedIn = true;
          UserStore.username = result.username;
        }
        
        // User has not successfully logged in
        else {
          UserStore.loading = false;
          UserStore.isLoggedIn = false;
        }
    }


    // Catches all errors with validating user login
    catch(e) {
      UserStore.loading = false;
      UserStore.isLoggedIn = false;
    }

  }


  // ========== RENDER APP ========== //

  render() {

    // ===== LOADING SCREEN ===== //
    if (UserStore.loading === true) {
      return (
        <div className="app">
          <div className="container">
            Loading, please wait...
          </div>
        </div>
      );
    }

    // ===== MAIN PAGE ===== //
    else {

      // ===== CLASSROOM COMPONENTS (LOGGED IN USER) ===== //
      if (UserStore.isLoggedIn === true) {
        return (
          <Router>

            <NavigationBar/>

            <Routes>
              <Route path='/Classroom' element={<Classroom/>} />
              <Route path='/LeaderBoard' element={<LeaderBoard/>} />
            </Routes>

          </Router>
        );
      }
    }

    // ===== REGISTRATION PAGE ===== //
    if (UserStore.registering === true) {
      return(
        <div className="app">
          <div className="container">
            <Router>
              <AccountCreationForm/>
            </Router>
          </div>
        </div>
      );
    }


    // ===== LOGIN FORM (FOR UNIDENTIFIED USERS) ===== //
    return (
      <div className="app">
        <div className="container">
          <Router>
            <LoginForm />
          </Router>

        </div>
      </div>
    );

  }

}

// Observer allows App component to listen for changes
export default observer(App);
