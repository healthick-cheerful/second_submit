import React from "react"
import ModeSelector from "./ModeSelector"
import SendEntry from "./SendEntry"
import GetEntry from "./GetEntry"
import "./css/MainContent.css"

class MainContent extends React.Component {
    constructor(props) {
        super(props)
        this.handleSendEntryChange = this.handleSendEntryChange.bind(this)
        this.state = {
            isUpdate: false
        }
    }
    handleSendEntryChange(value) {
        this.setState({
            isUpdate: value
        })
    }
    render() {
        return (
            <div className="main-content">
                <ModeSelector />
                <SendEntry onSendEntryChange={ this.handleSendEntryChange }/>
                <GetEntry />
            </div>
        )
    }
}

export default MainContent