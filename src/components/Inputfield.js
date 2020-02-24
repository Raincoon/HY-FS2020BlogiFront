import React from 'react'

const Input = ({className, text, value, onChange}) => {
    return(
        <div>
            {text} <input className={className}
            value = {value}
            onChange = {onChange}/>
        </div>
    )
}

export default Input