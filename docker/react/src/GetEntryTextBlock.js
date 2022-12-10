import React from "react"
import "./css/GetEntryTextBlock.css"

class GetEntryTextBlock extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="get-entry-text-block">
                <div className="text-area">
                    <div className="text-output">
                        {this.props.body}
                    </div>
                </div>
                <div className="action-bar">
                    <button>Bookmark</button>
                </div>
            </div>
        )
    }
}

export default GetEntryTextBlock