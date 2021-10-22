import React from 'react'

const Notification = ({ message }) => {
    return (
        <div>
            <p className="errors-message">{message}</p>
        </div>
    )
}

export default Notification