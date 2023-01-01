import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

import OwnerPools from './Pages/OwnerPools'
import OwnerPool from './Pages/OwnerPool'
import Public from './Pages/Public'
import awsconfig from './aws-exports'
import AppContextProvider from './Context/AppContextProvider'

Amplify.configure(awsconfig)

const formFields = {
  signUp: {
    name: {
      placeholder: 'Name',
      required: true,
      order: 1,
    },
    email: {
      order: 2,
    },
    password: {
      order: 3,
    },
    confirm_password: {
      order: 4,
    },
  },
}

function App() {
  const url = window.location.href
  return (
    <>
      {!url.includes('public') && (
        <Authenticator formFields={formFields}>
          <BrowserRouter>
            <AppContextProvider>
              <Routes>
                <Route path="/" element={<OwnerPools />} />
                <Route path="/:ownerId/pool/:poolId" element={<OwnerPool />} />
              </Routes>
            </AppContextProvider>
          </BrowserRouter>
        </Authenticator>
      )}
      <BrowserRouter>
        <Routes>
          <Route path="/:ownerId/pool/:poolId/public" element={<Public />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
