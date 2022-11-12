import React from "react"
import './HNIcon.css'

class HNIcon extends React.Component {
    render() {
        return (
            <div className="hn-icon">
                <img src={ this.props.iconPath } alt="user icon img"></img>
            </div>
        )
    }
}

export default HNIcon