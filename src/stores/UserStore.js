import { extendObservable } from 'mobx';


class UserStore {
    constructor() {
        // Useful for software tests!
        extendObservable(this, {

            // Tells if login form is loading
            loading: true,
            // Tells if user is logged in or not
            isLoggedIn: false,
            // Tells if user is attempting to access the registration page
            registering: false,
            // Holds the user's username
            username: ''
        })
    }
}

// Creates a new instance of the UserStore class and exports
export default new UserStore();