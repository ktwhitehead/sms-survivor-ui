import styled from 'styled-components'

const ModalStyled = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.show ? 1 : 0};
  transition: all 0.3s ease-in-out;
  pointer-events: ${props => props.show ? 'all': 'none'};
`
const ModalContent = styled.div`
  background-color: #fff;
  transition: all 0.3s ease-in-out;
  transform: translateY(-200px);
  max-width: 1024px;
  width: 100%;
  padding: 1.5em;
  border-radius: 4px;
`

export { ModalStyled, ModalContent }
