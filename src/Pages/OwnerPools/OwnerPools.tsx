import React, { useState, useContext, useEffect } from 'react'
import { Heading, Button, Text, Flex, TextField, SelectField } from '@aws-amplify/ui-react'
import { TiPlus } from 'react-icons/ti'
import { useNavigate } from 'react-router-dom'

import AppContext from '../../Context/AppContext'
import CreatePoolModal from './CreatePoolModal'
import apiClient from '../../utils/api-client'
import PoolSelection from '../../Components/PoolSelection'

const OwnerPools = () => {
  const { ownerPools, setOwnerPools, signOut, owner }: any = useContext(AppContext)
  const navigate = useNavigate()
  const [showModal, setShowModal] = useState(false)

  const navigateToPool = (poolId) => {
    navigate(`${owner?.appUser?.id}/pool/${poolId}`)
  }

  const getOwnerPools = async () => {
    if (!owner?.appUser) return
    const ownerPools = await apiClient.getPools(owner)
    setOwnerPools(ownerPools)
  }

  useEffect(() => {
    getOwnerPools()
  }, [owner])

  return (
    <>
      <Flex justifyContent="space-between" marginBottom="1.5em">
        <Heading level={3} onClick={() => signOut()}>
          Pools
        </Heading>
        <Button variation="primary" onClick={() => setShowModal(true)}>
          <TiPlus />
          New Pool
        </Button>
      </Flex>
      {ownerPools &&
        Object.keys(ownerPools).map((poolLeague) => {
          return (
            <>
              <Heading level={5} marginBottom="1em">
                {poolLeague}
              </Heading>
              {ownerPools[poolLeague].map((pool: any) => {
                return (
                  <PoolSelection
                    name={pool.name}
                    playerCount={10}
                    poolType={pool.type}
                    onClick={() => navigateToPool(pool.id)}
                  />
                )
              })}
            </>
          )
        })}
      {ownerPools && Object.keys(ownerPools).length === 0 && (
        <Flex>
          <Text margin="0 auto">You have no pools. Click the 'New Pool' button to get started.</Text>
        </Flex>
      )}
      <CreatePoolModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default OwnerPools
