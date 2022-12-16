import React from "react"
import axios from "axios"
import UserElement from "./UserElement"

class ViewUsers extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userList: []
        }
    }
    componentDidMount() {
        // ユーザー一覧を取得
        axios.post('./get_user_list.php')
        .then((response) => {
            this.setState({
                userList: response.data.user_list
            })
        }).catch((error) => {
            console.log(error)
        })
    }
    componentDidUpdate() {
        // ユーザー一覧を取得
        axios.post('./get_user_list.php')
        .then((response) => {
            // 無限ループ回避
            for(let i = 0; i < this.state.userList.length; i++) {
                if(this.state.userList[i]['follow'] !== response.data.user_list[i]['follow']) {
                    this.setState({
                        userList: response.data.user_list
                    })
                    break;
                }
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    render() {
        const userList = this.state.userList.map((user) => {
            return (
                <UserElement key={user.id} userId={user.id} userName={user.name} iconFilename={user.icon_filename}/>
            )
        })
        return (
            <div className="view-users">
                <h1 className="users">Users</h1>
                {userList}
            </div>
        )
    }
}
export default ViewUsers