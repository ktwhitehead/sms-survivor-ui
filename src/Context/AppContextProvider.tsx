import React, { useState, useEffect, useMemo } from 'react'
import { useAuthenticator } from '@aws-amplify/ui-react'

import AppContext from './AppContext'
import apiClient from '../utils/api-client'

export const AppContextProvider = ({ children }) => {
  const { user: amplifyUser, signOut } = useAuthenticator((context) => [context.user])
  const [owner, setOwner] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [ownerPools, setOwnerPools] = useState([])

  const getAppOwner = async () => {
    const appUser = await apiClient.getAppUser(amplifyUser)
    const owner = { amplifyUser, appUser }

    setOwner(owner)
  }

  useEffect(() => {
    getAppOwner()
  }, [amplifyUser])

  const context = {
    owner,
    signOut,
    isLoading,
    setIsLoading,
    ownerPools,
    setOwnerPools,
  }

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>
}

export default AppContextProvider
