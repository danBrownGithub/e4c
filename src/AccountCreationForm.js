import React            from 'react';
import InputField       from './InputField';
import SubmitButton     from './SubmitButton';
import UserStore        from './stores/UserStore';

// Login form will consist of 2 inputFields: one for the username, one for the password
// Login form will also consist of 1 submit button (to login after entering inputs)
class AccountCreationForm extends React.Component {

    // Constructor :)
    constructor(props) {
        super(props);
        this.state = {
            // Holds username value
            email: '',
            // Holds password value
            password: '',
            firstName: '',
            lastName: '',
            buttonDisabled: false
        }
    }

    // Sets input value
    setInputValue(property, val) {
        // Removes spaces from the input
        val = val.trim();

        // Max length for username / password will be 20 characters
        if (val.length > 20) {
            return;
        }

        this.setState({
            [property]: val
        })
    }


    // API call to authenticate user
    async doRegister() {

        // No username
        if (this.state.email === false) {
            return;
        }

        // No password
        if (this.state.password === false) {
            return;
        }

        // Disable submit button to prevent multiple requests
        


        try {
            
            let res = await fetch('http://127.0.0.1:8080/acct-creation', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // Sends the username and password to the API to see if it exists in the database
                body: JSON.stringify({
                    // NOTE: called it "email" instead of username
                    email: this.state.email,
                    password: this.state.password,
                    name: this.state.firstName,
                    lname: this.state.lastName
                })
            });

            let result = await res.status;
            console.log(result);
            // Registration successful, update UserStore info and log the user in
            if (result && result === 200) {
                
                UserStore.isLoggedIn = true;
                UserStore.registering = false;
                UserStore.username = this.state.email;
                UserStore.password = this.state.password;
            }
            

        }
        catch (e) {
            console.log(e);
        }
        
    }

    // ===== VALIDATE THAT USER IS ACCESSING REGISTRATION FORM ===== //
  async leaveRegistration() {

    try {
      UserStore.registering = false;
    }
  catch (e) {
      console.log(e);
    }
    
  }


    render() {
        return (
            <div className="accountCreationForm">
                
                <p class = "Register" >
                    Register for Engage4Corners
                </p>

                <InputField
                    // Give a label to this InputField -- useful for testing
                    label = 'Username_Input_Box'
                    // Type of input that the field will hold (just regular plaintext)
                    type = 'text'
                    // Placeholder text on the username box
                    placeholder = 'Email'
                    // Value in the text box
                    value = {this.state.email ? this.state.email: ''}
                    // Updates the official input value state
                    onChange = { (val) => this.setInputValue('email', val) }
                />


                <InputField
                    // Type of input that the field will hold (***** characters)
                    type = 'password'
                    // Placeholder text on the username box
                    placeholder = 'Password'
                    // Value in the text box
                    value = {this.state.password ? this.state.password: ''}
                    // Updates the official input value state
                    onChange = { (val) => this.setInputValue('password', val) }
                />

                <InputField
                    // Type of input that the field will hold (***** characters)
                    type = 'text'
                    // Placeholder text on the username box
                    placeholder = 'First Name'
                    // Value in the text box
                    value = {this.state.firstName ? this.state.firstName: ''}
                    // Updates the official input value state
                    onChange = { (val) => this.setInputValue('firstName', val) }
                />

                <InputField
                    // Type of input that the field will hold (***** characters)
                    type = 'text'
                    // Placeholder text on the username box
                    placeholder = 'Last Name'
                    // Value in the text box
                    value = {this.state.lastName ? this.state.lastName: ''}
                    // Updates the official input value state
                    onChange = { (val) => this.setInputValue('lastName', val) }
                />

                <SubmitButton
                    // Label on the button
                    text = 'Register'
                    // Sets disabled to whatever the current value of buttonDisabled is
                    disabled = {this.state.buttonDisabled}
                    // Clicking initiates the login process
                    onClick = { () => this.doRegister() }
                />

                <SubmitButton
                    // Label on the button
                    text = 'Back'
                    // Clicking takes user back to the login form
                    onClick = { () => this.leaveRegistration() }
                />

            </div>
        );
    }

}

export default AccountCreationForm;