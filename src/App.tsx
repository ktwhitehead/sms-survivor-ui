import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import OwnerPools from './Pages/OwnerPools'
import OwnerPool from './Pages/OwnerPool'
import awsconfig from './aws-exports'
import AppContextProvider from './Context/AppContextProvider'

Amplify.configure(awsconfig)

function App() {

  return (
    <Authenticator>
      <BrowserRouter>
        <AppContextProvider>
          <Routes>
            <Route path='/' element={<OwnerPools />} />
            <Route path='/:ownerId/:poolId' element={<OwnerPool />} />
          </Routes>
        </AppContextProvider>
      </BrowserRouter>
    </Authenticator>
  )
}

export default App
