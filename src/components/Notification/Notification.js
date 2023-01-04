import './Notification.css'
const Notification = ({ message }) => {
  if (message == null) {
    return
  }
  return (
    <div className={message.success ? 'success' : 'error'}>
      <p className="text">
        {message.success ? message.success : message.error}
      </p>
    </div>
  )
}
export default Notification
