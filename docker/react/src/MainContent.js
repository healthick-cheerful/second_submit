import React, { Profiler } from "react"
import ModeSelector from "./ModeSelector"
import SendEntry from "./SendEntry"
import GetEntry from "./GetEntry"
import Profile from "./Profile"
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
    componentDidUpdate() {
        // profileがfalseでなければmodeにuserIdを入れる
        if(this.props.profile !== false) {
            this.state.mode = "profile"
        }
    }
    render() {
        return (
            <div className="main-content">
                <ModeSelector onModeChange={ this.handleModeChange } />
                {this.state.mode !== "profile" &&
                    <SendEntry onSendEntryChange={ this.handleSendEntryChange }/>
                }
                {this.state.mode !== "profile" &&
                    <GetEntry mode={ this.state.mode }/>
                }
                {this.state.mode === "profile" &&
                    <Profile userId={this.props.profile}/>
                }
            </div>
        )
    }
}

export default MainContent