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
        let accessFile = "./get_entries.php"
        if(this.props.mode === "follow") {
            accessFile = "./get_follow_entries.php"
        } else if(this.props.mode === "bookmark") {
            accessFile = "get_bookmark_entries.php"
        }
        axios.post(accessFile)
        .then((response) => {
            this.setState({
                entries: response.data.entries_data
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    componentDidUpdate() {
        console.log(this.props.mode)
        let accessFile = "./get_entries.php"
        if(this.props.mode === "follow") {
            accessFile = "./get_follow_entries.php"
        } else if(this.props.mode === "bookmark") {
            accessFile = "get_bookmark_entries.php"
        }
        axios.post(accessFile)
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
                        <GetEntryUserBlock userId={entry.user_id} userName={entry.user_name} iconFilename={entry.icon_filename} />
                        <GetEntryTextBlock body={entry.body} createdAt={entry.created_at} imageFilenames={entry.image_filenames} />
                    </div>
                )
            } else {
                return (
                    <div className="get-entry-block" key={entry.id}>
                        <GetEntryUserBlock userId={entry.user_id} userName={entry.user_name} iconFilename={entry.icon_filename} />
                        <GetEntryTextBlock body={entry.body} createdAt={entry.created_at} />
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