import React, { useEffect, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Heading, Flex, Text, Button } from '@aws-amplify/ui-react'
import { TiPlus } from 'react-icons/ti'

import AppContext from '../../Context/AppContext'
import apiClient from '../../utils/api-client'
import SurvivorTable from './SurvivorTable/SurvivorTable'
import InvitePlayerModal from './InvitePlayerModal'

const OwnerPool = () => {
  const { owner }: any = useContext(AppContext)
  const { ownerId, poolId } = useParams()
  const [pool, setPool] = useState({})
  const [showModal, setShowModal] = useState(false)

  const getPool = async () => {
    const request = await apiClient.getPool(owner, poolId)
    console.log('KEATON', pool)
    setPool(request.pool)
  }

  useEffect(() => {
    if (!owner?.appUser?.id) return
    getPool()
  }, [poolId, owner])
  // return <div>cool, new pool, {JSON.stringify(pool)}</div>
  return (
    <>
      <Flex justifyContent="space-between" marginBottom="1.5em">
        <Heading level={3}>{pool?.name}</Heading>
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
