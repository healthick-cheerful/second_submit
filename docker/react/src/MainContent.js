import React from "react"
import ModeSelector from "./ModeSelector"
import SendEntry from "./SendEntry"
import "./css/MainContent.css"

class MainContent extends React.Component {
    constructor(props) {
        super(props)
        this.handleUpdateChange = this.handleUpdateChange.bind(this)
        this.state = {
            isUpdate: false
        }
    }
    handleUpdateChange(value) {
        this.setState({
            isUpdate: value
        })
    }
    render() {
        return (
            <div className="main-content">
                <ModeSelector />
                <SendEntry onUpdateChange={ this.handleUpdateChange }/>
            </div>
        )
    }
}

export default MainContent