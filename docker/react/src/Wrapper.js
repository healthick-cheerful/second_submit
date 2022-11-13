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
    }
    GetUserInfo() {
        axios.post("./user_info.php")
        .then((response) => {
            return response.data
        })
        .catch(() => {
            return false
        })
    }
    handleSignupChange(signup) {
        this.setState({signup})
        console.log(this.state.signup)
    }
    render() {
        const userInfo = this.GetUserInfo()
        // if(userInfo) {
        //     return <MainPage userName={ userInfo.name } iconPath={ userInfo.icon_path }/>
        // } else {
        //     return <LoginModal />
        // }
        if(this.state.signup) {
            return <SignupModal onSignupChange={ this.handleSignupChange } />
        } else {
            return <LoginModal onSignupChange={ this.handleSignupChange } />
        }
    }
}

export default Wrapper