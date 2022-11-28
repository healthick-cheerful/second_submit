import React from "react"
import MainContent from "./MainContent"
import SideBar from "./SideBar"
import "./css/MainPage.css"

class MainPage extends React.Component {
    render() {
        return (
            <div className="main-page">
                <div className="content">
                    <MainContent />
                    <SideBar />
                </div>
            </div>
        )
    }
}

export default MainPage