import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Input from './Inputfield'

const Blogform = ({ submit, notif }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    //handlers
    const handleTitleField = (event) => {
        setTitle(event.target.value)
    }
    const handleAuthorField = (event) => {
        setAuthor(event.target.value)
    }
    const handleUrlField = (event) => {
        setUrl(event.target.value)
    }

    //submit
    const submitBlog = (event) => {
        event.preventDefault()
        const blogToAdd = {
            title,
            author,
            url
        }

        try {
            submit(blogToAdd)
        } catch (error) {
            error.response.data.error ?
                notif('Error: ' + error.response.data.error) :
                notif('Blog has duplicate name, not submitted')
        }

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={submitBlog}>
            <Input text="Title:" value={title} onChange={handleTitleField} />
            <Input text="Author:" value={author} onChange={handleAuthorField} />
            <Input text="Url:" value={url} onChange={handleUrlField} />
            <button type="submit">Submit</button>
        </form>
    )
}

Blogform.propTypes = {
    submit: PropTypes.func.isRequired,
    notif: PropTypes.func.isRequired
}

export default Blogform