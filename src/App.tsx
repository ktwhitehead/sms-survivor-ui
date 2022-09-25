import { useEffect, useState } from 'react'
import { Amplify, Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import awsconfig from './aws-exports'
import '@aws-amplify/ui-react/styles.css'

Amplify.configure(awsconfig)

const apiUrl = import.meta.env.VITE_API_URL

console.log("KEATON", apiUrl)

function App({ signOut, user }: any) {
  const [pools, setPools] = useState([])

  const getPools = async () => {
    console.log(apiUrl, user.attributes)
    const userPools = await fetch(`${apiUrl}/${user.attributes.sub}/pools`)
    setPools(userPools)
  }

  useEffect(() => {
    getPools()
  }, [user])

  console.log("DKWE", user)
  return (
    <div className="App">
      <h1>Hello {user.attributes.email}</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default withAuthenticator(App);
