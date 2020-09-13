import { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'

import './modal.scss'

const portals = document.getElementById('portals')

const Modal: React.FC = ({ children }) => {
  const [close, setClose] = useState<boolean>(false)

  const el = useRef(document.createElement('div'))
  const modal = el.current
  modal.className = 'modal'

  const fixedBody = () => {
    if (!Number(document.body.dataset.havedialogshow)) {
      const scrollTop = document.body.scrollTop || document.documentElement.scrollTop
      document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px;left:0;right:0'
      document.body.setAttribute('data-havedialogshow', '1')
    } else {
      const t = Number(document.body.dataset.havedialogshow) + 1 + ''
      document.body.setAttribute('data-havedialogshow', t)
    }
  }

  const looseBody = () => {
    const t = Number(document.body.dataset.havedialogshow) - 1 + ''
    document.body.setAttribute('data-havedialogshow', t)
    if (!Number(document.body.dataset.havedialogshow)) {
      const body = document.body
      body.style.position = ''
      const top = body.style.top
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top)
      body.style.top = ''
      document.body.removeAttribute('data-havedialogshow')
    }
  }

  const handleClose = () => {
    portals.removeChild(modal)
    setClose(true)
    looseBody()
  }

  const closeBtnFixedBttom = (comp, handleClose) => {
    return (
      <>
        {comp}
        <div className="close-btn" onClick={ handleClose }></div>
      </>
    )
  }

  useEffect(() => {
    portals.appendChild(modal)
    fixedBody()

    return () => {
      portals.removeChild(modal)
      looseBody()
    }
  }, [])

  return close ? null : ReactDOM.createPortal(closeBtnFixedBttom(children, handleClose), modal)
}



export default Modal
