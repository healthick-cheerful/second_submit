import React from "react"
import "./css/EntryUserBlock.css"
import defaultIcon from "./assets/400x400.png"

class EntryUserBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            iconNotNull: false
        }
    }
    render() {
        return (
            <div className="entry-user-block">
            {this.state.iconNotNull &&
                <img src={ this.state.entryIcon }></img>
            }
            {!this.state.iconNotNull &&
                // <svg width="400" height="400" viewBox="0 0 400 400">
                //     <circle fill="#000000"></circle>
                // </svg>
                <img src={defaultIcon} />
            }
            <button className="entry-follow-button">Follow</button>

            </div>
        )
    }
}

export default EntryUserBlock