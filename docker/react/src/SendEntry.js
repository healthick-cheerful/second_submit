import React from "react"
import EntryUserBlock from "./EntryUserBlock"
import EntryFormBlock from "./EntryFormBlock"
import "./css/SendEntry.css"

class SendEntry extends React.Component {
    render() {
        return (
            <div className="send-entry">
                <EntryUserBlock />
                <EntryFormBlock />
            </div>
        )
    }
}

export default SendEntry