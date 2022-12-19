import React from "react"
import axios from "axios"
import "./css/UserElement.css"
import defaultIcon from "./assets/400x400.png"

class UserElement extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            existsIcon: false
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
            if(response.data.success) {
                this.setState({
                    follow: response.data.follow
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    handleProfileClick() {
        // Profileを表示する指示をリフトアップ
        const userId = this.props.userId
        this.props.onProfileClick(userId)
    }
    componentDidMount() {
        // followの状態をセット
        this.setState({
            follow: this.props.follow
        })
    }
    render() {
        return (
            <div className="user-element">
                <label>
                    <button className="hidden" onClick={ this.handleProfileClick }></button>
                {!this.state.existsIcon &&
                    <img className="icon" src={defaultIcon} />
                }
                {this.state.existsIcon &&
                    <img className="icon" src={this.props.iconFilename} />
                }
                    <h2 className="user-name">{ this.props.userName }</h2>
                </label>
                {this.state.follow &&
                    <button className="follow" onClick={this.handleFollowClick}>Bye</button>
                }
                {!this.state.follow &&
                    <button className="follow" onClick={this.handleFollowClick}>Follow</button>
                }
            </div>
        )
    }
}
export default UserElement