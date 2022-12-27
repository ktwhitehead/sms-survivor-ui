import React, { useState, useContext } from 'react'
import { Heading, Button, Flex, TextField, SelectField } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'

import AppContext from '../../Context/AppContext'
import apiClient from '../../utils/api-client'
import Modal from '../../Components/Modal'

const CreatePoolModal = ({ showModal, setShowModal }: any) => {
  const { owner }: any = useContext(AppContext)
  const navigate = useNavigate()
  const [poolName, setPoolName] = useState('')
  const [nameHasError, setNameHasError] = useState(false)
  const [poolLeague, setPoolLeague] = useState('NFL')
  const [poolType, setPoolType] = useState('Survivor')

  const createPool = async () => {
    if (!Boolean(poolName)) {
      setNameHasError(true)
      return
    }
    const newPool = await apiClient.createPool({ owner, poolName, poolType, poolLeague })
    navigate(`${owner?.appUser?.id}/pool/${newPool?.id}`)
  }

  return (
    <Modal onClose={() => setShowModal(false)} show={showModal}>
      <Heading level={5} marginBottom="1.5em">
        Create New Pool
      </Heading>
      <TextField
        label="Pool Name"
        value={poolName}
        onChange={(e: any) => {
          if (Boolean(poolName)) {
            setNameHasError(false)
          }
          setPoolName(e.target.value)
        }}
        hasError={nameHasError}
        errorMessage="Please provide a pool name."
      />
      <SelectField
        label="Pool League"
        marginBottom="1.5em"
        marginTop="1.5em"
        value={poolType}
        onChange={(e) => setPoolLeague(e.target.value)}
      >
        <option value="NFL">NFL</option>
        <option value="NHL" disabled>
          NHL (Coming Soon)
        </option>
      </SelectField>
      <SelectField
        label="Pool Type"
        marginBottom="1.5em"
        value={poolType}
        onChange={(e) => setPoolType(e.target.value)}
      >
        <option value="Survivor">Survivor</option>
        <option value="Pickem" disabled>
          Pick 'em (Coming Soon)
        </option>
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
