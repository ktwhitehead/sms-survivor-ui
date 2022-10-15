import React, { useState, useContext } from 'react'
import { Heading, Button, Flex, TextField, SelectField } from '@aws-amplify/ui-react'
import { useNavigate } from 'react-router-dom'

import AppContext from '../../Context/AppContext'
import apiClient from '../../utils/api-client'
import Modal from '../../Components/Modal'

const InvitePlayerModal = ({ showModal, setShowModal, poolId }: any) => {
  const { owner }: any = useContext(AppContext)
  const navigate = useNavigate()
  const [playerName, setPlayerName] = useState('')
  const [nameHasError, setNameHasError] = useState(false)
  const [playerNumber, setPlayerNumber] = useState('')
  const [numberHasError, setNumberHasError] = useState(false)

  const invitePlayer = async () => {
    if (!Boolean(playerName)) {
      setNameHasError(true)
      return
    }
    if (!Boolean(playerNumber)) {
      setNumberHasError(true)
      return
    }
    await apiClient.invitePlayer({ owner, playerName, playerNumber, poolId })
    setShowModal(false)
    navigate(0)
  }

  return (
    <Modal onClose={() => setShowModal(false)} show={showModal}>
      <Heading level={5} marginBottom="1.5em">
        Invite Player
      </Heading>
      <TextField
        label="Player Name"
        value={playerName}
        onChange={(e: any) => {
          if (Boolean(playerName)) {
            setNameHasError(false)
          }
          setPlayerName(e.target.value)
        }}
        hasError={nameHasError}
        errorMessage="Please provide the player's name."
      />
      <TextField
        label="Player Number"
        value={playerNumber}
        onChange={(e: any) => {
          if (Boolean(playerNumber)) {
            setNumberHasError(false)
          }
          setPlayerNumber(e.target.value)
        }}
        hasError={numberHasError}
        errorMessage="Please provide the player's number."
      />
      <Flex direction="row" justify-content="space-between" marginTop="1em">
        <Button variation="primary" onClick={() => invitePlayer()}>
          Invite Player
        </Button>
        <Button onClick={() => setShowModal(false)}>Cancel</Button>
      </Flex>
    </Modal>
  )
}

export default InvitePlayerModal
