import React from "react"
import "./css/EntryFormBlock.css"

class EntryFormBlock extends React.Component {
    render() {
        return (
            <div className="entry-form-block">
                <form method="post">
                    <div className="text-input">
                        <textarea></textarea>
                    </div>
                    <div className="action-bar">
                        <button>Confirm</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EntryFormBlock