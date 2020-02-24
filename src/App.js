import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Loginform from './components/LoginForm'
import Blogform from './components/Blogform'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notif, setNotif] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    const fetch = async () => {
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs)
    }
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

  //handlers
  const handleUsernameField = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordField = (event) => {
    setPassword(event.target.value)
  }
  const handleTitleField = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorField = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlField = (event) => {
    setUrl(event.target.value)
  }

  const handleLogin = async (event) => {
    console.log('button pressed!')
    event.preventDefault()
    try {
      const currentUser = await loginService.login({ username, password })
      //if successfully logged in
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(currentUser)
      )
      blogService.setToken(currentUser.token)
      setUser(currentUser)
      setUsername('')
      setPassword('')
    } catch (exeception) {
      // if login failed
      notifMsg('Login failed: wrong username or password')
    }
  }
  const logOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken('')
    setUser(null)
    notifMsg('Logged out')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const blogToAdd = {
        title,
        author,
        url
      }
      console.log(blogToAdd)
      const newBlog = await blogService.create(blogToAdd)

      setBlogs(blogs.concat(newBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      notifMsg('Blog ' + newBlog.title + ' by ' + newBlog.author + ' added!')
    } catch (error) {

      error.response.data.error ?
        notifMsg('Error: ' + error.response.data.error) :
        notifMsg('Blog has duplicate name, not submitted')
    }
  }

  /* if (user === null) {
    
    return (
      <div>
        <h2>Log in to application</h2>
        <Loginform
          login={handleLogin} uname={username} pw={password} handleUnameFld={handleUsernameField} handlePwFld={handlePasswordField}
        />
      </div>
    )
  } */

  return (
    <div>
      <Notification message={notif} />
      <h2>Blogs</h2>
      <div>
        {user === null ?
          <>
            <Loginform login={handleLogin} uname={username} pw={password} handleUname={handleUsernameField} handlePw={handlePasswordField} />
            <br /></>
          :
          <>
            <p>Logged in as {user.name} <button onClick={logOut}>Log out</button></p>
            <Blogform submit={handleSubmit} title={title} author={author} url={url} handleTitle={handleTitleField} handleAuthor={handleAuthorField} handleUrl={handleUrlField} />
            <br /></>
        }
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App