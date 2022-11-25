import React from "react"
import axios from "axios"

import "./css/SignupModal.css"

class SignupModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            result: {}
        }
        this.handleSignup = this.handleSignup.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSignup() {
        this.props.onSignupChange(false)
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

        params.append('name', this.state.name)
        params.append('email', this.state.email)
        params.append('password', this.state.password)
        axios.post('./signup.php', params)
        .then((response) => {
            this.setState({result: response.data})
        }).catch(() => {
            this.setState({result: {success: false}})
        })
        event.preventDefault()
    }

    render() {
        return (
            <div className="signup-modal modal">
                <div className="overlay">
                {this.state.result.success &&
                    <div className="result-message">
                        <h1 className="success">登録が完了しました。</h1>
                    </div>
                }
                {this.state.result.success === false &&
                    <div className="result-message">
                        <h1 className="error">登録に失敗しました。</h1>
                    </div>
                }
                {this.state.result.exist_email &&
                    <div className="result-message">
                        <h1 className="error">既に存在しているメールアドレスです。</h1>
                    </div>
                }
                {this.state.result.server_error &&
                    <div className="result-message">
                        <h1 className="error">サーバーでエラーが発生しています。</h1>
                    </div>
                }
                    <div className="content">
                        <h1>Signup</h1>
                        <form onSubmit={ this.handleSubmit }>
                            <label htmlFor="name">name</label><br></br><input type="text" name="name" value={ this.state.name } onChange={ this.handleInputChange } /><br></br>
                            <label htmlFor="email">email</label><br></br><input type="email" name="email" value={ this.state.email } onChange={ this.handleInputChange } /><br></br>
                            <label htmlFor="password">password</label><br></br><input type="password" name="password" value={ this.state.password } onChange={ this.handleInputChange } /><br></br>
                            <button className="confirm" type="submit">Confirm</button>
                        </form>
                        <button className="login" onClick={ this.handleSignup }>Login</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupModal