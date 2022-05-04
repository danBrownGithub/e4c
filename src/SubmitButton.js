import React from 'react';

class SubmitButton extends React.Component {

    render() {
        return (
            <div className="submitButton">
                
                <button
                    // Think of this as a button constructor. We are defining general variables (disabled, onClick()) 
                    // that can be modified for each instance of button
                    className = 'btn'
                    disabled = {this.props.disabled}
                    // Allows us to define multiple functions for button click
                    onClick = { () => this.props.onClick() }
                >
                    {this.props.text}
                </button>
            </div>
        );
    }

}

export default SubmitButton;