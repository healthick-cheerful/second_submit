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
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        const params = new URLSearchParams
        params.append('user_id', this.props.userId)
        axios.post('./follow.php', params)
        .then((response) => {
            this.props.onFollowChange(response.data.follow)
        }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        return (
            <div className="user-element">
                {!this.state.existsIcon &&
                    <img className="icon" src={defaultIcon} />
                }
                {this.state.existsIcon &&
                    <img className="icon" src={this.props.iconFilename} />
                }
                <h2 className="user-name">{ this.props.userName }</h2>
                <button className="follow" onClick={ this.handleClick }>Follow</button>
            </div>
        )
    }
}
export default UserElement