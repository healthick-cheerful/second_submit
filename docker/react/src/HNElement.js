import React from "react"
import './css/HNElement.css'

class HNElement extends React.Component {
    render() {
        return (
            <div className="hn-element">
                { this.props.name }
            </div>
        )
    }
}

export default HNElement;