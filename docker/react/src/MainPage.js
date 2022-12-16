import React from "react"
import MainContent from "./MainContent"
import SideBar from "./SideBar"
import "./css/MainPage.css"

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profile: false
        }
        this.handleProfileClick = this.handleProfileClick.bind(this)
    }
    handleProfileClick(value) {
        // profileのリフトアップを補足してリフトダウン
        this.setState({
            profile: value
        })
    }
    render() {
        return (
            <div className="main-page">
                <div className="content">
                    <MainContent profile={this.state.profile}/>
                    <SideBar onProfileClick={ this.handleProfileClick } />
                </div>
            </div>
        )
    }
}

export default MainPage