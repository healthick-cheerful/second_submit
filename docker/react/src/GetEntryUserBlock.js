import React from "react"
import axios from "axios"
import "./css/GetEntryUserBlock.css"
import defaultIcon from "./assets/400x400.png"

class GetEntryUserBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            iconNotNull: false
        }
        this.handleFollowClick = this.handleFollowClick.bind(this)
        this.handleProfileClick = this.handleProfileClick.bind(this)
    }
    handleFollowClick() {
        // フォローまたはその解除
        const params = new URLSearchParams
        params.append('user_id', this.props.userId)
        axios.post('./follow.php', params)
        .then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }
    handleProfileClick() {
        // profileのリフトアップ
        this.props.onProfileClick(this.props.userId)
    }
    render() {
// icon表示機能追加予定
        return (
            <div className="get-entry-user-block">
                <label>
                    <button className="hidden" onClick={ this.handleProfileClick }></button>
                {this.state.iconNotNull &&
                    <img src={ this.state.entryIcon }></img>
                }
                {!this.state.iconNotNull &&
                    <img src={defaultIcon} />
                }
                    <h1>{this.props.userName}</h1>
                </label>

            <button className="entry-follow-button" onClick={ this.handleFollowClick }>Follow</button>

            </div>
        )
    }
}

export default GetEntryUserBlock