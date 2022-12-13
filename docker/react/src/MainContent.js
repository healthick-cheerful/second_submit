import React from "react"
import ModeSelector from "./ModeSelector"
import SendEntry from "./SendEntry"
import GetEntry from "./GetEntry"
import "./css/MainContent.css"

class MainContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isUpdate: false,
            mode: "all"
        }
        this.handleSendEntryChange = this.handleSendEntryChange.bind(this)
        this.handleModeChange = this.handleModeChange.bind(this)
    }
    handleSendEntryChange(value) {
        this.setState({
            isUpdate: value
        })
    }
    handleModeChange(value) {
        this.setState({
            mode: value
        })
    }
    render() {
        return (
            <div className="main-content">
                <ModeSelector onModeChange={ this.handleModeChange } />
                <SendEntry onSendEntryChange={ this.handleSendEntryChange }/>
                <GetEntry mode={ this.state.mode }/>
            </div>
        )
    }
}

export default MainContent