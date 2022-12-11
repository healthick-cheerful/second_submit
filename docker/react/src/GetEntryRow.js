import React from "react"

class GetEntryRow extends React.Component{
    render() {
        return (
            <span>
                {this.props.row}
                {!this.props.end &&
                    <br />
                }
            </span>
        )
    }
}

export default GetEntryRow