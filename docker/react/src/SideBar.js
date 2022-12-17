import React from "react"
import ViewUsers from "./ViewUsers"
import "./css/SideBar.css"

class SideBar extends React.Component {
    constructor(props) {
        super(props)
        this.handleProfileClick = this.handleProfileClick.bind(this)
    }
    handleProfileClick(value) {
        // Profileのリフトアップ
        this.props.onProfileClick(value)
    }
    render() {
        return (
            <div className="side-bar">
                <ViewUsers onProfileClick={ this.handleProfileClick }/>
            </div>
        )
    }
}

export default SideBar