import React from "react"
import ModeSelector from "./ModeSelector"
import "./css/MainContent.css"

class MainContent extends React.Component {
    render() {
        return (
            <div className="main-content">
                <ModeSelector />
            </div>
        )
    }
}

export default MainContent