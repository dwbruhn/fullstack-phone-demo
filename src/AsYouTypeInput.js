import React, { Component } from 'react';

class AsYouTypeInput extends Component {
    state = {
        typed: '',
        output: ''
    };

    formatAsTyped(phoneNumberString) {

        let output = '';

        this.props.formatter.clear();

        // loop over phone number string and input digits one by one, then return final output
        for (let i = 0; i < phoneNumberString.length; i++) {
            output = this.props.formatter.inputDigit(phoneNumberString.charAt(i));
        }

        return output;
    }


    // update state for input value each time there's a change
    handleInput(event) {
        const target = event.target;
        const value = target.value;

        this.setState({
            input: value,
            output: this.formatAsTyped(value)
        });
    }

    handleInput = this.handleInput.bind(this); // necessary to prevent losing this when called from inside another object

    render() {
        return (
            <div>
                <h3>Type a phone number:</h3>
                <div><input type="text" onChange={this.handleInput} /></div><br />
                <h3>{this.state.output}</h3>
            </div>
        )
    }

}

export default AsYouTypeInput;
