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
        }
        this.handleSendEntryChange = this.handleSendEntryChange.bind(this)
        this.handleModeChange = this.handleModeChange.bind(this)
        this.handleProfileClick = this.handleProfileClick.bind(this)
    }
    handleSendEntryChange(value) {
        this.setState({
            isUpdate: value
        })
    }
    handleModeChange(value) {
        // modeのリフトアップ
        this.props.onModeChange(value)
    }
    handleProfileClick(value) {
        // 
        this.props.onModeChange(value)
    }
    componentDidUpdate() {
        if(this.props.mode !== this.state.mode) {
            if(this.props.mode === "all" || this.props.mode === "follow" || this.props.mode === "bookmark") {
                this.setState({
                    mode: this.props.mode,
                    userId: false
                })
            } else if(this.props.mode !== this.state.userId) {
                this.setState({
                    mode: "profile",
                    userId: this.props.mode
                })
            }
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
                    <GetEntry onProfileClick={ this.handleProfileClick } mode={ this.state.mode }/>
                }
                {this.state.mode === "profile" &&
                    <Profile userId={this.state.userId}/>
                }
            </div>
        )
    }
}

export default MainContent