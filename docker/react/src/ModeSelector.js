import React from "react"
import "./css/ModeSelector.css"

class ModeSelector extends React.Component {
    render() {
        return (
            <div className="mode-selector">
                <h1 className="mode-headline">All</h1>
                <h1 className="mode-headline">Follow</h1>
                <h1 className="mode-headline">Bookmark</h1>
            </div>
        )
    }
}

export default ModeSelector