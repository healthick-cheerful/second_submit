import React from "react"
import axios from "axios"
import MainPage from "./MainPage"
import LoginModal from "./LoginModal"
import SignupModal from "./SignupModal"

class Wrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signup: false
        }
        this.handleSignupChange = this.handleSignupChange.bind(this)
        this.handleLoginChange = this.handleLoginChange.bind(this)
    }
    handleSignupChange(value) {
        this.setState({signup: value})
    }
    handleLoginChange(value) {
        this.setState({login: value})
    }
    render() {
        if(this.state.login) {
            return <MainPage />
        } else if(this.state.signup) {
            return <SignupModal onSignupChange={ this.handleSignupChange } />
        } else {
            return <LoginModal onSignupChange={ this.handleSignupChange } onLoginChange={ this.handleLoginChange }/>
        }
    }
}

export default Wrapper