import React from "react"
import axios from "axios"
import MainPage from "./MainPage"
import LoginModal from "./LoginModal"

class Top extends React.Component {
    GetUserInfo() {
        axios.post("./user_info.php")
        .then((response) => {
            return response.data
        })
        .catch(() => {
            return false
        })
    }
    render() {
        let userInfo = this.GetUserInfo()
        if(userInfo) {
            return <MainPage userName={ userInfo.name } iconPath={ userInfo.icon_path }/>
        } else {
            return <LoginModal />
        }
    }
}

export default Top