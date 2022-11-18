import React from "react"

class LoginModal extends React.Component {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange() {
        this.props.onSignupChange(true)
    }
    render() {
        return (
            <div className="login-modal">
                <h1>Please Login.</h1><br></br>
                <button onClick={ this.handleChange }>Sign up</button>
            </div>

        )
    }
}

export default LoginModal