import React from "react"
import axios from "axios"

class UserElement extends React.Component {
    constructor(props) {
        super(props)
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
                <img src={this.props.iconFilename} />
                <h2 className="user-name">{ this.props.userName }</h2>
                <button onClick={ this.handleClick }>Follow</button>
            </div>
        )
    }
}
export default UserElement