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

        this.canvasRef = React.createRef()
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
                    base64Images[i] = canvas.toDataURL()
                }
                image.src = reader.result
            }
            reader.readAsDataURL(files.item(i))
        }
        this.setState({
            images: base64Images
        })
    }
    handleSubmit(event) {
        const params = new URLSearchParams
        params.append('body', this.state.body)
        if(this.state.images !== []) {
            for(let i = 0; i < this.state.images.length; i++) {
                params.append(`image_base64[${i}]`, this.state.images[i])
            }
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
                        <label className="text-area">
                            <textarea value={ this.state.body } onChange={ this.handleBodyChange } style={ this.state.textareaStyle }></textarea>
                        </label>
                    </div>
                    <div className="action-bar">
                        <input id="imageInput" type="file" accept="image/*" multiple onChange={ this.handleImageInputChange }/>
                        <canvas className="image-canvas" ref={ this.canvasRef }></canvas>
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