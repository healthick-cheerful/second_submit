import React from "react"
import './HeaderNav.css'
import HNElement from "./HNElement"
import HNIcon from "./HNIcon"

class HeaderNav extends React.Component {
    render() {
        return (
            <div className="header-nav">
                <HNElement name="A"/>
                <HNElement name="B"/>
                <HNElement name="C"/>
                <HNIcon iconPath={ this.props.iconPath }/>
            </div>
        )
    }
}

export default HeaderNav