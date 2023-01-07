import { useState } from 'react'
const Togglable = (props) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisbile = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const toogleVisibility = () => setVisible(!visible)
  return (
    <div>
      <div style={hideWhenVisbile}>
        <button onClick={toogleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toogleVisibility}>cancel</button>
      </div>
    </div>
  )
}
export default Togglable
