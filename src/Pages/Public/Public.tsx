import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heading, Flex, Text, Button } from '@aws-amplify/ui-react'
import { TiPlus } from 'react-icons/ti'

import apiClient from '../../utils/api-client'
import SurvivorTable from '../OwnerPool/SurvivorTable/SurvivorTable'

const Public = () => {
  const { ownerId, poolId } = useParams()
  const [pool, setPool] = useState({})
  const [showModal, setShowModal] = useState(false)

  const getPool = async () => {
    const request = await apiClient.getPublicPool(ownerId, poolId)
    setPool(request)
  }

  useEffect(() => {
    getPool()
  }, [])

  return (
    <>
      <Flex justifyContent="space-between" marginBottom="1.5em">
        <Flex>
          <Heading level={3}>{pool?.name}</Heading>
          <Heading level={6} style={{ margin: 'auto' }}>{`Week ${pool?.currentWeek}`}</Heading>
        </Flex>
      </Flex>
      <SurvivorTable data={pool} publicView />
    </>
  )
}

export default Public
