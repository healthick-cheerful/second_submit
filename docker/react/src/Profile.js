import React from "react"
import axios from "axios"
import "./css/Profile.css"
import defaultIcon from "./assets/400x400.png"
import imagesIcon from "./assets/images.svg"

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
                this.setState({
                    userId: this.props.userId,
                    userData: response.data.user_data
                })
            })
        }
    }
    render() {
        // button表示のための分岐
        let button
        if(this.state.userData.login_user === true) {
            button = <h1 className="name">You</h1>
        } else {
            if(this.state.follow) {
                button = <button className="follow" onClick={this.handleFollowClick}>Bye</button>
            } else {
                button = <button className="follow" onClick={this.handleFollowClick}>Follow</button>
            }
        }
        // 設定機能表示のための分岐
        let info
        if(this.state.userData.login_user === true) {
            info = <div className="user-setting">
                <span className="form-block"><span className="element-set">Icon: <input id="iconInput" type="file" accept="image/*"></input><label className="icon" htmlFor="iconInput"><img className="images-icon" src={ imagesIcon } alt="add-images" /></label></span><button className="change">Change</button></span>
                <span className="form-block"><span className="element-set">Name: <input value={this.state.userData.name}></input></span><button className="change">Change</button></span>
                <span className="form-block"><span className="element-set">Email: <input value={this.state.userData.email}></input></span><button className="change">Change</button></span>
                <span className="form-block"><span className="element-set">Password: <input type="password"></input></span><button className="change">Change</button></span>
            </div>
        } else  {
            info = <div className="information">
                <span className="info-element">Name: {this.state.userData.name}</span>
                <span className="info-element">Email: {this.state.userData.email}</span>
            </div>
        }
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
                    {button}
                </div>
                {info}
            </div>
        )
    }
}

export default Profile