import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Input from './Inputfield'

const Loginform = ({ login, notif }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    //handlers
    const handleUsernameField = (event) => {
        setUsername(event.target.value)
    }
    const handlePasswordField = (event) => {
        setPassword(event.target.value)
    }

    //login
    const handleLogin = event => {
        event.preventDefault()
        const account = {
            username,
            password
        }
        try {
            login(account)
            setUsername('')
            setPassword('')
        } catch (exeception) {
            // if login failed
            notif('Login failed: wrong username or password')
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <Input text="Username:" value={username} onChange={handleUsernameField} />
            <Input text="Password:" value={password} onChange={handlePasswordField} />
            <button type="submit">Log In</button>
        </form>
    )
}
Loginform.propTypes = {
    login: PropTypes.func.isRequired,
    notif: PropTypes.func.isRequired
}

export default Loginform
