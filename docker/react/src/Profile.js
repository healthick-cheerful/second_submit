import React from "react"
import axios from "axios"
import "./css/Profile.css"
import defaultIcon from "./assets/400x400.png"

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            userId: false,
            follow: false
        }
        this.handleFollowClick = this.handleFollowClick.bind(this)
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
    componentDidMount() {
        const profileParams = new URLSearchParams
        profileParams.append('user_id', this.props.userId)
        axios.post('./profile.php', profileParams)
        .then((response) => {
            console.log(response.data)
            this.setState({
                userId: this.props.userId,
                userData: response.data.user_data
            })
        })

        const followParams = new URLSearchParams
        followParams.append('user_id', this.props.userId)
        axios.post('./get_follow.php', followParams)
        .then((response) => {
            if(response.data.success) {
                this.setState({
                    follow: response.data.follow
                })
            }
        })
    }
    componentDidUpdate() {
        if(this.props.userId !== this.state.userId) {
            const params = new URLSearchParams
            params.append('user_id', this.props.userId)
            axios.post('./profile.php', params)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    userId: this.props.userId,
                    userData: response.data.user_data
                })
            })
        }
    }
    render() {
        return (
            <div className="profile">
                <div className="profile-header">
                    <span className="icon-and-name">
                    {this.state.userData.icon_filename !== null &&
                        <img className="user-icon" src={this.state.userData.icon_filename} />
                    }
                    {this.state.userData.icon_filename === null  &&
                        <img className="user-icon" src={defaultIcon} />
                    }
                        <h1 className="name">{this.state.userData.name}</h1>
                    </span>
                    {this.state.follow &&
                        <button className="follow" onClick={this.handleFollowClick}>Bye</button>
                    }
                    {!this.state.follow &&
                        <button className="follow" onClick={this.handleFollowClick}>Follow</button>
                    }
                </div>
                <div className="information">
                    <span className="info-element">Name: {this.state.userData.name}</span>
                    <span className="info-element">Email: {this.state.userData.email}</span>
                </div>
            </div>
        )
    }
}

export default Profile