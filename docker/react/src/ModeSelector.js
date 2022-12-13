import React from "react"
import "./css/ModeSelector.css"

class ModeSelector extends React.Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(event) {
        const target = event.target
        const value = target.value
        this.props.onModeChange(value)
        event.preventDefault()
    }
    render() {
        return (
            <div className="mode-selector">
                <button className="mode-headline" value="all" form="mode-selector" onClick={this.handleClick}>All</button>
                <button className="mode-headline" value="follow" form="mode-selector" onClick={this.handleClick}>Follow</button>
                <button className="mode-headline" value="bookmark" form="mode-selector" onClick={this.handleClick}>Bookmark</button>
            </div>
        )
    }
}

export default ModeSelector