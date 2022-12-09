import React from "react"
import axios from "axios"
import GetEntryBlock from "./GetEntryBlock"
import "./css/GetEntry.css"
class GetEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: []
        }
    }
    componentDidMount() {
        axios.post('./get_entries.php')
        .then((response) => {
            console.log(response)
            this.setState({
                entries: response.data.success
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        const entryList = this.state.entries.map((entry) => {
            if("image_filenames" in entry) {
                return <GetEntryBlock key={entry.id} userId={entry.user_id} body={entry.body} createdAt={entry.created_at} imageFilenames={entry.image_filenames} />
            } else {
                return <GetEntryBlock key={entry.id} userId={entry.user_id} body={entry.body} createdAt={entry.created_at} />
            }
        })

        return (
            <div className="get-entry">
                {entryList}
            </div>
        )
    }
}

export default GetEntry