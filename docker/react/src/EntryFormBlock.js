import React from "react"
import axios from "axios"
import "./css/EntryFormBlock.css"

class EntryFormBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
            textareaHeight: {},
        }
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleBodyChange(event) {
        const target = event.target
        const value = target.value
        const height = {
            height: target.scrollHeight,
            overflow: "hidden"
        }
        if(target.scrollHeight > 200) {
            height.height = "200px"
            height.overflow = "scroll"
        }
        this.setState({
            body: value,
            textareaStyle: height
        })
    }
    handleSubmit(event) {
        let params = new URLSearchParams
        params.append('body', this.state.body)
        axios.post('./post_entry.php', params)
        .then((response) => {
            this.props.onEntryFormBlockChange(response.data)
        }).catch(() => {
            this.props.onEntryFormBlockChange({success: false})
        })
        event.preventDefault()
    }
    render() {
        return (
            <div className="entry-form-block">
                <form method="post" onSubmit={ this.handleSubmit }>
                    <div className="text-input">
                        <textarea value={ this.state.body } onChange={ this.handleBodyChange } style={ this.state.textareaStyle }></textarea>
                    </div>
                    <div className="action-bar">
                        <button type="submit">Confirm</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EntryFormBlock