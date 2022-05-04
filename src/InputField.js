import React from 'react';

class InputField extends React.Component {

    render() {
        return (
            <div className="inputField">
                
                <input
                    className = 'input'
                    // Type could be email, password, username, etc.
                    type = {this.props.type}
                    placeholder = {this.props.placeholder}
                    // The actual text in the input field
                    value = {this.props.value}
                    // Function that handles input field changes (pass in target.value of the input field as parameter)
                    onChange = { (e) => this.props.onChange(e.target.value)}
                />
                
            </div>
        );
    }

}

export default InputField;