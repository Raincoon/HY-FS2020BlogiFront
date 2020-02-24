import React from 'react'
import Input from './Inputfield'

const Blogform = ({ submit, title, author, url, handleTitle, handleAuthor, handleUrl }) => {

    return (
        <form onSubmit={submit}>
            <Input text="Title:" value={title} onChange={handleTitle} />
            <Input text="Author:" value={author} onChange={handleAuthor} />
            <Input text="Url:" value={url} onChange={handleUrl} />
            <button type="submit">Submit</button>
        </form>
    )
}

export default Blogform