import React from "react"
import axios from "axios"
import "./css/EntryUserBlock.css"
import defaultIcon from "./assets/400x400.png"

class EntryUserBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            iconNotNull: false
        }
    }
    componentDidMount() {
        axios.post('./get_login_user.php')
        .then((response) => {
            this.setState({
                userData: response.data.user_data
            })
        })
    }
    componentDidUpdate() {
        if(this.state.userData.icon_filename !== null && this.state.iconNotNull === false) {
            this.setState({
                iconNotNull: true
            })
        }
    }
    render() {
        return (
            <div className="entry-user-block">
            {this.state.iconNotNull &&
                <img src={ "./image/" + this.state.userData.icon_filename }></img>
            }
            {!this.state.iconNotNull &&
                <img src={defaultIcon} />
            }
            </div>
        )
    }
}

export default EntryUserBlock