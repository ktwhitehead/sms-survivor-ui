import React, { useState, useContext } from 'react'
import { Heading, Button, Text, Flex, TextField, SelectField } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'

import AppContext from '../../Context/AppContext'
import apiClient from '../../utils/api-client'
import Modal from '../../Components/Modal'

const CreatePoolModal = ({ showModal, setShowModal }) => {
  const { isLoading, setIsLoading, ownerPools, setOwnerPools, signOut, owner } = useContext(AppContext)
  const navigate = useNavigate()
  const [poolName, setPoolName] = useState('')
  const [poolType, setPoolType] = useState('NFL')

  const createPool = async () => {
    const newPool = await apiClient.createPool({ owner, poolName, poolType })
    navigate(`${owner?.attributes?.sub}/${newPool?.id}`)
  }

  return (
    <Modal title="My Modal" onClose={() => setShowModal(false)} show={showModal}>
      <Heading level={5} marginBottom="1.5em">
        Create New Pool
      </Heading>
      <TextField label="Pool Name" value={poolName} onChange={(e) => setPoolName(e.target.value)} />
      <SelectField
        label="Pool League"
        marginBottom="1.5em"
        value={poolType}
        onChange={(e) => setPoolType(e.target.value)}
      >
        <option value="NFL">NFL</option>
      </SelectField>
      <Flex direction="row" justify-content="space-between">
        <Button variation="primary" onClick={() => createPool()}>
          Create Pool
        </Button>
        <Button onClick={() => setShowModal(false)}>Cancel</Button>
      </Flex>
    </Modal>
  )
}

export default CreatePoolModal
