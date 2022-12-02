import React from "react"
import "./css/EntryFormBlock.css"

class EntryFormBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
            textareaHeight: {}
        }
        this.handleBodyChange = this.handleBodyChange.bind(this)
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
    render() {
        return (
            <div className="entry-form-block">
                <form method="post">
                    <div className="text-input">
                        <textarea value={ this.state.body } onChange={ this.handleBodyChange } style={ this.state.textareaStyle }></textarea>
                    </div>
                    <div className="action-bar">
                        <button>Confirm</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EntryFormBlock