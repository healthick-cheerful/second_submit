import React from "react"
import axios from "axios"

import "./css/LoginModal.css"
// css追加せよ
class LoginModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            result: {}
        }
        this.handleSignup = this.handleSignup.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSignup() {
        this.props.onSignupChange(true)
    }
    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name

        this.setState({
            [name]: value
        })
    }
    handleSubmit(event) {
        let params = new URLSearchParams

        params.append('email', this.state.email)
        params.append('password', this.state.password)
        axios.post('./login.php', params)
        .then((response) => {
            if(response.data.success === true) {
                this.props.onLoginChange(true)
            }
            this.setState({result: response.data})
        }).catch(() => {
            this.setState({result: {success: false}})
        })
        event.preventDefault()
    }

    render() {
        return (
            <div className="login-modal modal">
                <div className="overlay">
                {this.state.result.success === false &&
                    <div className="result-message">
                        <h1 className="error">ログインに失敗しました。</h1>
                    </div>
                }
                {this.state.result.server_error &&
                    <div className="result-message">
                        <h1 className="error">サーバーでエラーが発生しています。</h1>
                    </div>
                }
                    <div className="content">
                        <h1>Login</h1>
                        <form onSubmit={ this.handleSubmit }>
                            <label htmlFor="email">email</label><input type="email" name="email" value={ this.state.email } onChange={ this.handleInputChange } />
                            <label htmlFor="password">password</label><input type="password" name="password" value={ this.state.password } onChange={ this.handleInputChange } /><br></br>
                            <button className="confirm" type="submit">Confirm</button>
                        </form>
                        <button className="login" onClick={ this.handleSignup }>Signup</button>
                    </div>
                </div>
            </div>

        )
    }
}

export default LoginModal