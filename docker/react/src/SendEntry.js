import React from "react"
import EntryUserBlock from "./EntryUserBlock"
import EntryFormBlock from "./EntryFormBlock"
import "./css/SendEntry.css"

class SendEntry extends React.Component {
    constructor(props) {
        super(props)
        this.handleEntryFormBlockChange = this.handleEntryFormBlockChange.bind(this)
        this.state = {
            result: {}
        }
    }
    handleEntryFormBlockChange(value) {
        this.setState({
            result: value
        })
    }
    render() {
        return (
            <div className="send-entry">
            {this.state.result.success === true &&
                <div className="result-message result-success">
                    <h1 className="success">投稿が完了しました。</h1>
                </div>
            }
            {this.state.result.success === false &&
                <div className="result-message result-error">
                    <h1 className="error">投稿に失敗しました。</h1>
                </div>
            }
            {this.state.result.server_error === true &&
                <div className="result-message result-error">
                    <h1 className="error">サーバーでエラーが発生しています。</h1>
                </div>
            }
                <div className="entry-block">
                    <EntryUserBlock />
                    <EntryFormBlock onEntryFormBlockChange={ this.handleEntryFormBlockChange } />
                </div>
            </div>
        )
    }
}

export default SendEntry