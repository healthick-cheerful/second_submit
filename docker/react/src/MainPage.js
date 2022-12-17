import React from "react"
import MainContent from "./MainContent"
import SideBar from "./SideBar"
import "./css/MainPage.css"

class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            mode: "all"
        }
        this.handleProfileClick = this.handleProfileClick.bind(this)
        this.handleModeChange = this.handleModeChange.bind(this)
    }
    handleProfileClick(value) {
        // profileのリフトアップを補足してリフトダウン
        this.setState({
            mode: value
        })
    }
    handleModeChange(value) {
        this.setState({
            mode: value
        })
    }
    render() {
        return (
            <div className="main-page">
                <div className="content">
                    <MainContent mode={this.state.mode} onModeChange={ this.handleModeChange } />
                    <SideBar onProfileClick={ this.handleProfileClick } />
                </div>
            </div>
        )
    }
}

export default MainPage