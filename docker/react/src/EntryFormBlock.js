import React from "react"
import axios from "axios"
import "./css/EntryFormBlock.css"
import imagesIcon from "./assets/images.svg"

class EntryFormBlock extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            body: "",
            textareaHeight: {},
            images: {}
        }
        this.handleBodyChange = this.handleBodyChange.bind(this)
        this.handleImageInputChange = this.handleImageInputChange.bind(this)
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
    handleImageInputChange(event) {
        const target = event.target
        const files = target.files
        if(files.length > 4) {
            alert('画像は最大4枚までしか選択できません')
            return
        }
        const base64Images = []
        for(let i = 0; i < files.length; i++) {
            const reader = new FileReader()
            reader.onload = () => {
                base64Images[i] = reader.result
            }
            reader.readAsDataURL(files.item(i))
        }
        this.setState({
            images: base64Images
        })
    }
    handleSubmit(event) {
        let params = new URLSearchParams
        params.append('body', this.state.body)
        if(this.state.base64Images !== []) {
            params.append('image_base64', this.state.base64Images[0])
        }
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
                        <input id="imageInput" type="file" accept="image/*" multiple onChange={ this.handleImageInputChange }/>
                        <canvas className="image-canvas" ref={ this.canvasForShrink }></canvas>
                        <label className="add-images" htmlFor="imageInput">
                            <img className="images-icon" src={ imagesIcon } alt="add-images" />
                        </label>
                        <button type="submit">Confirm</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default EntryFormBlock