import React from "react"
import "./css/GetEntryUserBlock.css"
import defaultIcon from "./assets/400x400.png"

class GetEntryUserBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            iconNotNull: false
        }
    }
    render() {
// icon表示機能追加予定
        return (
            <div className="get-entry-user-block">
            {this.state.iconNotNull &&
                <img src={ this.state.entryIcon }></img>
            }
            {!this.state.iconNotNull &&
                <img src={defaultIcon} />
            }
            <button className="entry-follow-button">Follow</button>

            </div>
        )
    }
}

export default GetEntryUserBlock