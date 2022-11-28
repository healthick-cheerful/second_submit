import React from "react"
import ModeSelector from "./ModeSelector"
import SendEntry from "./SendEntry"
import "./css/MainContent.css"

class MainContent extends React.Component {
    render() {
        return (
            <div className="main-content">
                <ModeSelector />
                <SendEntry />
            </div>
        )
    }
}

export default MainContent