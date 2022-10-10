import React, { useState, useContext, useEffect } from 'react'
import { Heading, Button, Text, Flex, TextField, SelectField } from '@aws-amplify/ui-react'
import { TiPlus } from 'react-icons/ti'

import AppContext from '../../Context/AppContext'
import CreatePoolModal from './CreatePoolModal'
import apiClient from '../../utils/api-client'

const OwnerPools = () => {
  const { isLoading, setIsLoading, ownerPools, setOwnerPools, signOut, owner } = useContext(AppContext)
  const [showModal, setShowModal] = useState(false)

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
          Survivor Pools
        </Heading>
        <Button variation="primary" onClick={() => setShowModal(true)}>
          <TiPlus />
          New Pool
        </Button>
      </Flex>
      {ownerPools?.length === 0 && (
        <Flex>
          <Text margin="0 auto">You have no pools. Click the 'New Pool' button to get started.</Text>
        </Flex>
      )}
      <CreatePoolModal showModal={showModal} setShowModal={setShowModal} />
    </>
  )
}

export default OwnerPools
