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
        this.handleTextChange = this.handleTextChange.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleImageInputChange = this.handleImageInputChange.bind(this)

        this.canvasRef = React.createRef()
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
    handleTextChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }
    handleImageInputChange(event) {
        const target = event.target
        const files = target.files
        let base64Image
        const canvas = this.canvasRef.current
        const reader = new FileReader()
        const image = new Image()
        reader.onload = () => {
            image.onload = () => {
                const originalWidth = image.naturalWidth
                const originalHeight = image.naturalHeight
                const maxLength = 800
                if(originalWidth <= maxLength && originalWidth <= maxLength) {
                    canvas.width = originalWidth
                    canvas.height = originalHeight
                } else if(originalWidth >= originalHeight) {
                    canvas.width = maxLength
                    canvas.height = maxLength * originalHeight / originalWidth
                } else {
                    canvas.width = maxLength * originalWidth / originalHeight
                    canvas.height = maxLength
                }
                const context = canvas.getContext("2d")
                context.drawImage(image, 0, 0, canvas.width, canvas.height)
                base64Image = canvas.toDataURL()
                this.setState({
                    icon: base64Image
                })
            }
            image.src = reader.result
        }
        reader.readAsDataURL(files.item(0))
    }
    handleButtonClick(event) {
        const target = event.target
        const id = target.id
        let kind;
        let value;
        if(id === 'change-name') {
            kind = 'name'
            value = this.state.name
        } else if(id === 'change-email') {
            kind = 'email'
            value = this.state.email
        } else if(id === 'change-password') {
            kind = 'password'
            value = this.state.password
        } else if(id === 'change-icon') {
            kind = 'icon'
            value = this.state.icon
        }
        if(kind === 'icon') {
            console.log(value)
            const settingParams = new URLSearchParams
            settingParams.append('icon', value)
            axios.post('./icon_setting.php', settingParams)
            .then((response) => {
                console.log(response.data)
            })
        } else {
            const settingParams = new URLSearchParams
            settingParams.append('kind', kind)
            settingParams.append('value', value)
            axios.post('./user_settings.php', settingParams)
            .then((response) => {
                console.log(response.data)
            })
        }
    }
    componentDidMount() {
        const profileParams = new URLSearchParams
        profileParams.append('user_id', this.props.userId)
        axios.post('./profile.php', profileParams)
        .then((response) => {
            this.setState({
                userId: this.props.userId,
                userData: response.data.user_data,
                name: response.data.user_data.name,
                email: response.data.user_data.email
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
        const iconPath = './image/' + this.state.userData.icon_filename
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
                <canvas className="image-canvas" ref={ this.canvasRef }></canvas>
                <span className="form-block"><span className="element-set">Icon: <input id="iconInput" type="file" accept="image/*" onChange={ this.handleImageInputChange }></input><label className="icon" htmlFor="iconInput"><img className="images-icon" src={ imagesIcon } alt="add-images" /></label></span><button id="change-icon" className="change" onClick={ this.handleButtonClick }>Change</button></span>
                <span className="form-block"><span className="element-set">Name: <input name="name" value={this.state.name} onChange={ this.handleTextChange }></input></span><button id="change-name" className="change" onClick={ this.handleButtonClick }>Change</button></span>
                <span className="form-block"><span className="element-set">Email: <input name="email" value={this.state.email} onChange={ this.handleTextChange }></input></span><button id="change-email" className="change" onClick={ this.handleButtonClick }>Change</button></span>
                <span className="form-block"><span className="element-set">Password: <input name="password" value={this.state.password} type="password" onChange={ this.handleTextChange }></input></span><button id="change-password" className="change" onClick={ this.handleButtonClick }>Change</button></span>
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
                        <img className="user-icon" src={iconPath} />
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