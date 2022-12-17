import React from "react"
import axios from "axios"

class Profile extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        // const params = new URLSearchParams
        // params.append('user_id', this.props.userId)
        // axios.post('./profile.php')
        // .then((response) => {
        //     console.log(response.data)
        //     this.setState({
        //         userData: response.data
        //     })
        // })
    }
    render() {
        return (
            <div className="profile">
                {this.props.userId}
            </div>
        )
    }
}

export default Profile