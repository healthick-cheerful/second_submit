import React from "react"
import GetEntryRow from "./GetEntryRow"
import "./css/GetEntryTextBlock.css"
import axios from "axios"

class GetEntryTextBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookmark: this.props.bookmark
        }
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        const params  = new URLSearchParams
        params.append('entry_id', this.props.entryId)
        axios.post('./bookmark.php', params)
        .then((response) => {
            if('bookmark' in response.data) {
                this.props.onBookmarkChange(this.props.entryId)
            }
        })
        .catch((error) => {
            console.log(error)
        })
    }
    componentDidUpdate() {
        if(this.props.bookmark !== this.state.bookmark) {
            this.setState({
                bookmark: this.props.bookmark
            })
        }
    }
    render() {
        const rows = this.props.body.split('\n')
        const nl2br = rows.map((row, index) => {
            if(rows.length === index + 1) {
                return <GetEntryRow key={index} row={row} end={true} />
            } else {
                return <GetEntryRow key={index} row={row} end={false}/>
            }
        })
        let images = false
        if("imageFilenames" in this.props) {
            images = this.props.imageFilenames.map((filename) => {
                const filepath = "./image/" + filename
                return <img src={filepath} />
            })
        }
        return (
            <div className="get-entry-text-block">
                <div className="text-area">
                    <div className="text-output">
                        {nl2br}
                    </div>
                </div>
                {"imageFilenames" in this.props &&
                    <div className="images-bar">
                        {images}
                    </div>
                }
                <div className="action-bar">
                {!this.state.bookmark &&
                    <button onClick={ this.handleClick }>Bookmark</button>
                }
                {this.state.bookmark &&
                    <button onClick={ this.handleClick }>Bookmarked</button>
                }
                </div>
            </div>
        )
    }
}

export default GetEntryTextBlock