import React from "react"
import EntryUserBlock from "./EntryUserBlock"
import EntryFormBlock from "./EntryFormBlock"
import "./css/SendEntry.css"

class SendEntry extends React.Component {
    constructor(props) {
        super(props)
        this.handleUpdateChange.bind(this)
        this.state = {
            isUpdate: false
        }
    }
    handleUpdateChange(value) {
        this.setState({
            isUpdate: value
        })
    }
    render() {
        return (
            <div className="send-entry">
                <EntryUserBlock />
                <EntryFormBlock onUpdateChange={ this.handleUpdateChange }/>
            </div>
        )
    }
}

export default SendEntry