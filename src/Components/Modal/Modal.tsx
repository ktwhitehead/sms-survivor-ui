import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Text, Heading, Button, Flex } from '@aws-amplify/ui-react'

import { ModalStyled, ModalContent } from './Modal.styled'

const Modal = ({ show, onClose, children }) => {
  if (!show) return null

  const closeOnEscapeKeyDown = (e) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    return function cleanup() {
      document.body.removeEventListener('keydown', closeOnEscapeKeyDown)
    }
  }, [])

  return ReactDOM.createPortal(
    <ModalStyled onClick={onClose} show={show}>
      <ModalContent onClick={(e) => e.stopPropagation()}>{children}</ModalContent>
    </ModalStyled>,
    document.getElementById('root'),
  )
}

export default Modal
