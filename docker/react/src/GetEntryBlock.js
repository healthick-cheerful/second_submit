import React from "react"

class GetEntryBlock extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props)
        return (
            <div className="get-entry-block">
                <p>{this.props.body}</p>
            </div>
        )
    }
}

export default GetEntryBlock