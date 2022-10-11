import React from 'react'
import { Text, Flex } from '@aws-amplify/ui-react'

import { PoolLink, PoolInfo } from './PoolSelection.styled'

const PoolSelection = ({ name, playerCount, poolType }: any) => {
  return (
    <PoolLink>
      <Text margin="auto 0">{name}</Text>
      <Flex>
        <PoolInfo>
          <Text>Type</Text>
          <Text>{poolType}</Text>
        </PoolInfo>
        <PoolInfo>
          <Text>Players</Text>
          <Text>{playerCount}</Text>
        </PoolInfo>
      </Flex>
    </PoolLink>
  )
}

export default PoolSelection
