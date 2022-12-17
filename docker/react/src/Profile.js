import React from "react"
import axios from "axios"
import "./css/Profile.css"
import defaultIcon from "./assets/400x400.png"

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: [],
            userId: false
        }
    }
    componentDidMount() {
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
                    <button className="follow">Follow</button>
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