import React, { useState } from 'react'

const Togglable = (props) => {
    const [visible, setVisible] = useState(false)

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    if (!visible) {
        return (
            <div>
                <button onClick={toggleVisibility}>{props.buttonLabel}</button>
            </div>
        )
    }

    return (
        <div>
            <button onClick={toggleVisibility}>hide</button>
            {props.children}
        </div>
    )

}

export default Togglable