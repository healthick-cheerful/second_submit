import React from "react"
import MainContent from "./MainContent"
import SideBar from "./SideBar"
import "./css/MainPage.css"

class MainPage extends React.Component {
    render() {
        return (
            <div className="main-page">
                <MainContent />
                <SideBar />
            </div>
        )
    }
}

export default MainPage