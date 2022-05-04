import React            from 'react';
import InputField       from './InputField';
import SubmitButton     from './SubmitButton';
import UserStore        from './stores/UserStore';



// Login form will consist of 2 inputFields: one for the username, one for the password
// Login form will also consist of 1 submit button (to login after entering inputs)
class LoginForm extends React.Component {

    // Constructor :)
    constructor(props) {
        super(props);
        this.state = {
            // Holds username value
            username: '',
            // Holds password value
            password: '',
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

    // Resets the form if there are any issues (ex: username/password incorrect)
    resetForm() {
        this.setState({
            username: '',
            password: '',
            buttonDisabled: false
        })
    }

    // API call to authenticate user
    async doLogin() {

        // Invalid username
        if (this.state.username === false) {
            return;
        }

        // Invalid password
        if (this.state.password === false) {
            return;
        }

        // Disable submit button to prevent multiple requests
        this.setState({
            buttonDisabled: true
        })


        try {
            
            let res = await fetch('http://127.0.0.1:8080/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                // Sends the username and password to the API to see if it exists in the database
                body: JSON.stringify({
                    // NOTE: called it "email" instead of username
                    email: this.state.username,
                    password: this.state.password
                })
            });

            let result = await res.json();
            // Login successful, update UserStore info
            if (result && result.success) {
                UserStore.isLoggedIn = true;
                UserStore.registering = false;
                UserStore.username = result.username;
            }
            // Login unsuccessful --> reset the login form
            else if (result && result.success === false) {
                this.resetForm();
                alert(result.msg);
            }

        }
        catch (e) {
            console.log(e);
            // Reset form in the event of any wild errors being thrown
            this.resetForm();
        }
        
    }


    // ===== VALIDATE THAT USER IS ACCESSING REGISTRATION FORM ===== //
    async accessRegistration() {

    try {
      UserStore.registering = true;
    }
  catch (e) {
      console.log(e);
    }
    
    }


    render() {
        return (
            <div className="loginForm">
                
                <p class = "SignIn" >
                    Sign In To Engage4Corners
                </p>
                

                <InputField
                    // Give a label to this InputField -- useful for testing
                    label = 'Username_Input_Box'
                    // Type of input that the field will hold (just regular plaintext)
                    type = 'text'
                    // Placeholder text on the username box
                    placeholder = 'Username'
                    // Value in the text box
                    value = {this.state.username ? this.state.username: ''}
                    // Updates the official input value state
                    onChange = { (val) => this.setInputValue('username', val) }
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

                <SubmitButton
                    // Label on the button
                    text = 'Login'
                    // Sets disabled to whatever the current value of buttonDisabled is
                    disabled = {this.state.buttonDisabled}
                    // Clicking initiates the login process
                    onClick = { () => this.doLogin() }
                />

                <SubmitButton
                    // Label on the button
                    text = 'Register'
                    // Sets disabled to whatever the current value of buttonDisabled is
                    disabled = {this.state.buttonDisabled}
                    // Clicking initiates the login process
                    onClick = { () => this.accessRegistration() }
                />
            
            </div>
        );
    }

}

export default LoginForm;