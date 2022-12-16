import React from "react"
import ViewUsers from "./ViewUsers"
import "./css/SideBar.css"

class SideBar extends React.Component {
    render() {
        return (
            <div className="side-bar">
                <ViewUsers />
            </div>
        )
    }
}

export default SideBar