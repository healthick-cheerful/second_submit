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
            mode: this.props.mode,
            followList: []
        }
        this.handleMoreClick = this.handleMoreClick.bind(this)
        this.handleProfileClick = this.handleProfileClick.bind(this)
        this.handleFollowChange = this.handleFollowChange.bind(this)
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
                console.log(response.data)
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
    handleFollowChange(value) {
        let exists = false
        for(let i = 0; i < this.state.followList.length; i++) {
            if(this.state.followList[i] === value) {
                exists = true
                break
            }
        }
        // valueがfollowListになければ加え、あれば削除する
        if(exists === false) {
            const newFollowList = Array.from(this.state.followList)
            newFollowList.push(value)
            this.setState({
                followList: newFollowList
            })
        } else {
            const newFollowList = []
            for(let i = 0; i < this.state.followList.length; i++) {
                if(this.state.followList[i] !== value) {
                    newFollowList.push(this.state.followList[i])
                } else {
                    continue
                }
            }
            this.setState({
                followList: newFollowList
            })
        }
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
        // follow情報の取得
        axios.post('./get_follow_list.php')
        .then((response) => {
            console.log(response.data)
            this.setState({
                followList: response.data.follow_list
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
                console.log(response.data)
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
        console.log(this.state.followList)
        const entryList = this.state.entries.map((entry) => {
            // フォローしているユーザーか判定、entry.followに情報を代入
            let exists = false
            for(let i = 0; i < this.state.followList.length; i++) {
                if(entry.user_id === this.state.followList[i]) {
                    exists = true
                }
            }
            if(exists) {
                entry.follow = true
            } else {
                entry.follow = false
            }
            if("image_filenames" in entry) {
                return (
                    <div className="get-entry-block" key={entry.id}>
                        <GetEntryUserBlock onProfileClick={ this.handleProfileClick } onFollowChange={ this.handleFollowChange } userId={entry.user_id} userName={entry.user_name} iconFilename={entry.icon_filename} follow={entry.follow} />
                        <GetEntryTextBlock entryId={entry.id} body={entry.body} createdAt={entry.created_at} imageFilenames={entry.image_filenames} />
                    </div>
                )
            } else {
                return (
                    <div className="get-entry-block" key={entry.id}>
                        <GetEntryUserBlock onProfileClick={ this.handleProfileClick } onFollowChange={ this.handleFollowChange } userId={entry.user_id} userName={entry.user_name} iconFilename={entry.icon_filename} follow={entry.follow} />
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