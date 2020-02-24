import React, { useState } from 'react'

const Blog = ({ blog, edit, remove, user }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingBottom: 8,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const addLike = () => {
    const newBlog = {
      ...blog,
      likes: (blog.likes + 1)
    }
    edit(newBlog)
  }

  const removeBlog = () => {
    if (window.confirm("Remove " + blog.title + "?")) {
      remove(blog.id)
    }
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title} <button onClick={toggleVisibility}>hide</button>
        <br />{blog.url}
        <br />likes {blog.likes} <button onClick={addLike}>like</button>
        <br />{blog.author}
        {user ?
          blog.user ?
            blog.user.username === user.username ?
              <><br /><button onClick={removeBlog}>Delete Entry</button></> :
              <></>
            : <></>
          : <></>
        }
      </div>
    )
  }
  return (
    <div style={blogStyle} onClick={toggleVisibility}>
      {blog.title} {blog.author? "by":""} {blog.author} <button >view</button>
    </div>
  )
}

export default Blog
