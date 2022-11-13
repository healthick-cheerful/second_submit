import React from "react"

class SignupModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange() {
        this.props.onSignupChange(false)
    }
    render() {
        return (
            <div className="signup-modal">
                <h1>Please Signup.</h1><br></br>
                <button onClick={ this.handleChange }>Login</button>
            </div>

        )
    }
}

export default SignupModal