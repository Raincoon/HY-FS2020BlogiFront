import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Loginform from './components/LoginForm'
import Blogform from './components/Blogform'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState(null)


  const fetch = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs.sort((b1, b2) => (b2.likes - b1.likes)

    ))
  }

  useEffect(() => {
    fetch()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const savedUser = JSON.parse(loggedUserJSON)
      setUser(savedUser)
      blogService.setToken(savedUser.token)
    }
  }, [])

  //Notification 
  const notifMsg = msg => {
    setNotif(msg)
    setTimeout(() => {
      setNotif(null)
    }, 6000)
  }

  //user functions
  const handleLogin = async (account) => {
    const currentUser = await loginService.login(account)
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(currentUser)
    )
    blogService.setToken(currentUser.token)
    setUser(currentUser)
  }
  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken('')
    setUser(null)
    notifMsg('Logged out')
  }

  //blog functions
  const handleSubmit = async (blogToAdd) => {
    const newBlog = await blogService.create(blogToAdd)
    notifMsg('Blog ' + newBlog.title + ' by ' + newBlog.author + ' added!')
    setBlogs(blogs.concat(newBlog))
  }
  const blogEdit = async newBlog => {
    await blogService.update(newBlog.id, newBlog)
    fetch()
  }
  const blogRemove = async id => {
    try {
      await blogService.remove(id)
      fetch()
      notifMsg('Entry deleted!')
    } catch (error) {
      error.response.data.error ?
        notifMsg('Error: ' + error.response.data.error) :
        notifMsg('Error: ' + error.message)
    }
  }

  return (
    <div>
      <Notification message={notif} />
      <h2>Blogs</h2>
      <div>
        {user === null ?
          <>
            <Loginform login={handleLogin} notif={notifMsg} />
            <br /></>
          :
          <>
            <p>Logged in as {user.name} <button onClick={logOut}>Log out</button></p>
            <Togglable buttonLabel="Submit new blog">
              <Blogform submit={handleSubmit} notif={notifMsg} />
            </Togglable>
            <br /></>
        }
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} edit={blogEdit} remove={blogRemove} user={user} />
      )}
    </div>
  )
}

export default App