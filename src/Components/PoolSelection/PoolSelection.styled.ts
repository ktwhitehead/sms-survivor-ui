import styled from 'styled-components'
import { Link } from '@aws-amplify/ui-react'

const PoolLink = styled(Link)`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0.6em;
  border: 1px solid gray;
  margin-bottom: 0.5em;
  border-radius: 4px;
`

const PoolInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 1em;
  text-align: center;
`

export { PoolLink, PoolInfo }
