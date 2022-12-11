import React from "react"
import GetEntryRow from "./GetEntryRow"
import "./css/GetEntryTextBlock.css"

class GetEntryTextBlock extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const rows = this.props.body.split('\n')
        const nl2br = rows.map((row, index) => {
            if(rows.length === index + 1) {
                return <GetEntryRow key={index} row={row} end={true} />
            } else {
                return <GetEntryRow key={index} row={row} end={false}/>
            }
        })
        return (
            <div className="get-entry-text-block">
                <div className="text-area">
                    <div className="text-output">
                        {nl2br}
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