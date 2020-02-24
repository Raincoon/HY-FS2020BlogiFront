import React from 'react'
import Input from './Inputfield'

const Loginform = ({ login, uname, pw, handleUname, handlePw }) => {

    return (
        <form onSubmit={login}>
            <Input text="Username:" value={uname} onChange={handleUname} />
            <Input text="Password:" value={pw} onChange={handlePw} />
            <button type="submit">Log In</button>
        </form>
    )
}

export default Loginform
