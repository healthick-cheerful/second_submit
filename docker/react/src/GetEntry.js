import React from "react"
import axios from "axios"
import GetEntryUserBlock from "./GetEntryUserBlock"
import GetEntryTextBlock from "./GetEntryTextBlock"
import "./css/GetEntry.css"
class GetEntry extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            entries: [],
            mode: this.props.mode
        }
        this.handleMoreClick = this.handleMoreClick.bind(this)
        this.handleProfileClick = this.handleProfileClick.bind(this)
    }
    handleMoreClick() {
        // 投稿をさらに読み込む
        const lastId = this.state.lastId
        if(lastId !== false) {
            let accessFile = "./get_entries.php"
            if(this.props.mode === "follow") {
                accessFile = "./get_follow_entries.php"
            } else if(this.props.mode === "bookmark") {
                accessFile = "get_bookmark_entries.php"
            }
            const params = new URLSearchParams
            params.append('last_id', lastId)
            axios.post(accessFile, params)
            .then((response) => {
                this.setState({
                    entries: this.state.entries.concat(response.data.entries_data),
                    lastId: response.data.last_id
                })
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    handleProfileClick(value) {
        // profileのリフトアップ
        this.props.onProfileClick(value)
    }
    componentDidMount() {
        // モードチェンジ
        let accessFile = "./get_entries.php"
        if(this.props.mode === "follow") {
            accessFile = "./get_follow_entries.php"
        } else if(this.props.mode === "bookmark") {
            accessFile = "get_bookmark_entries.php"
        }
        axios.post(accessFile)
        .then((response) => {
            this.setState({
                entries: response.data.entries_data,
                lastId: response.data.last_id
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    componentDidUpdate() {
        // モードが違っていれば通信する
        if(this.state.mode !== this.props.mode) {
            let accessFile = "./get_entries.php"
            if(this.props.mode === "follow") {
                accessFile = "./get_follow_entries.php"
            } else if(this.props.mode === "bookmark") {
                accessFile = "./get_bookmark_entries.php"
            }
            axios.post(accessFile)
            .then((response) => {
                this.setState({
                    entries: response.data.entries_data,
                    mode: this.props.mode,
                    lastId: response.data.last_id
                })
            }).catch((error) => {
                console.log(error)
            })
        }
    }
    render() {
        const entryList = this.state.entries.map((entry) => {
            if("image_filenames" in entry) {
                return (
                    <div className="get-entry-block" key={entry.id}>
                        <GetEntryUserBlock onProfileClick={ this.handleProfileClick } userId={entry.user_id} userName={entry.user_name} iconFilename={entry.icon_filename} />
                        <GetEntryTextBlock entryId={entry.id} body={entry.body} createdAt={entry.created_at} imageFilenames={entry.image_filenames} />
                    </div>
                )
            } else {
                return (
                    <div className="get-entry-block" key={entry.id}>
                        <GetEntryUserBlock onProfileClick={ this.handleProfileClick } userId={entry.user_id} userName={entry.user_name} iconFilename={entry.icon_filename} />
                        <GetEntryTextBlock entryId={entry.id} body={entry.body} createdAt={entry.created_at} />
                    </div>
                )
            }
        })

        return (
            <div className="get-entry">
                {entryList}
                <button className="more" onClick={ this.handleMoreClick }>More</button>
            </div>
        )
    }
}

export default GetEntry