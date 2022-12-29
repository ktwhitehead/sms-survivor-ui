import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heading, Flex, Button } from '@aws-amplify/ui-react'
import { TiPlus } from 'react-icons/ti'

import AppContext from '../../Context/AppContext'
import apiClient from '../../utils/api-client'
import SurvivorTable from './SurvivorTable/SurvivorTable'
import InvitePlayerModal from './InvitePlayerModal'

const OwnerPool = () => {
  const { owner }: any = useContext(AppContext)
  const { poolId } = useParams()
  const [pool, setPool] = useState({})
  const [showModal, setShowModal] = useState(false)

  const getPool = async () => {
    const request = await apiClient.getPool(owner, poolId)
    setPool(request)
  }

  useEffect(() => {
    if (!owner?.appUser?.id) return
    getPool()
  }, [poolId, owner])

  return (
    <>
      <Flex justifyContent="space-between" marginBottom="1.5em">
        <Flex>
          <Heading level={3}>{pool?.name}</Heading>
          <Heading level={6} style={{ margin: 'auto' }}>{`Week ${pool?.currentWeek}`}</Heading>
        </Flex>
        <Button variation="primary" onClick={() => setShowModal(true)}>
          <TiPlus />
          Invite Player
        </Button>
      </Flex>
      <SurvivorTable data={pool} />
      <InvitePlayerModal showModal={showModal} setShowModal={setShowModal} poolId={pool?.id} />
    </>
  )
}

export default OwnerPool
