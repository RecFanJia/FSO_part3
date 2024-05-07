const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='notification'>
        {message}
      </div>
    )
  }

const BadNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className='error'>
        {message}
      </div>
    )
  }

export {Notification, BadNotification}