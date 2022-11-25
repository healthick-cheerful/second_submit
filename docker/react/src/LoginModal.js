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
            this.setState({result: response})
        }).catch(() => {
            this.setState({result: {server_error: true}})
        })
        event.preventDefault()
    }
    render() {
        return (
            <div className="login-modal modal">
                <div className="overlay">
                    {this.state.result && 
                        <div className="result-message">
                            {this.state.result.success &&
                                <h1 className="success">登録が完了しました。</h1>
                            }
                            {this.state.result.exist_email &&
                                <h1 className="error">既に存在しているメールアドレスです。</h1>
                            }
                            {this.state.result.server_error &&
                                <h1 className="error">サーバーでエラーが発生しています。</h1>
                            }
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