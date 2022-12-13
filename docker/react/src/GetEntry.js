import React from "react"
import axios from "axios"
import GetEntryUserBlock from "./GetEntryUserBlock"
import GetEntryTextBlock from "./GetEntryTextBlock"
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
            this.setState({
                entries: response.data.entries_data
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        const entryList = this.state.entries.map((entry) => {
            if("image_filenames" in entry) {
                return (
                    <div className="get-entry-block" key={entry.id}>
                        <GetEntryUserBlock userName={entry.user_id} iconFilename={entry.icon_filename} />
                        <GetEntryTextBlock userId={entry.user_id} body={entry.body} createdAt={entry.created_at} imageFilenames={entry.image_filenames} />
                    </div>
                )
            } else {
                return (
                    <div className="get-entry-block" key={entry.id}>
                        <GetEntryUserBlock entryId={entry.id} userId={entry.user_id} />
                        <GetEntryTextBlock entryId={entry.id} userId={entry.user_id} body={entry.body} createdAt={entry.created_at} />
                    </div>
                )
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