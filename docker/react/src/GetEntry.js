import React from "react"
import axios from "axios"
import "./css/GetEntry.css"
class GetEntry extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        axios.post('./get_entries.php')
        .then((response) => {
            console.log(response)
            this.setState({
                entries: response
            })
        }).catch(() => {
            this.setState({
                entries: false
            })
        })
    }
    render() {
        return (
            <div className="get-entry">

            </div>
        )
    }
}

export default GetEntry