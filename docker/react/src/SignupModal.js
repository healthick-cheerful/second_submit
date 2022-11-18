import React from "react"
import axios from "axios"

class SignupModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: ""
        }
        this.handleSignup = this.handleSignup.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSignup() {
        this.props.onSignupChange(false)
    }
    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        let params = new URLSearchParams

        params.append('name', this.state.name)
        params.append('email', this.state.email)
        params.append('password', this.state.password)
        axios.post('./signup.php', params)
        .then((response) => {
            console.log(response)
        }).catch((error) => {
            console.log(error)
        })
        event.preventDefault()
    }
    render() {
        return (
            <div className="signup-modal">
                <form onSubmit={ this.handleSubmit }>
                    <input type="text" name="name" value={ this.state.name } onChange={ this.handleInputChange } />
                    <input type="email" name="email" value={ this.state.email } onChange={ this.handleInputChange } />
                    <input type="password" name="password" value={ this.state.password } onChange={ this.handleInputChange } />
                    <button type="submit">Confirm</button>
                </form>
                <button onClick={ this.handleSignup }>Login</button>
            </div>
        )
    }
}

export default SignupModal