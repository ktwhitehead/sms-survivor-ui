const apiUrl = import.meta.env.VITE_API_URL

const headers = (owner: any) => ({
  method: 'POST',
  headers: { Authorization: owner?.amplifyUser?.signInUserSession?.accessToken?.jwtToken },
})

const apiClient = {
  getAppUser: async (amplifyUser: any) => {
    const request = await fetch(`${apiUrl}/get-app-user`, {
      ...headers({ amplifyUser }),
      body: JSON.stringify({ amplifyUserId: amplifyUser?.attributes?.sub }),
    })
    return await request.json()
  },
  getPools: async (owner: any) => {
    console.log('UHHHHH', owner?.appUser?.id)
    const request = await fetch(`${apiUrl}/owner/${owner?.appUser?.id}/pools`, headers(owner))
    return await request.json()
  },
  createPool: async ({ owner, poolName, poolType }: any) => {
    const request = await fetch(`${apiUrl}/owner/${owner?.appUser?.id}/create-pool`, {
      ...headers(owner),
      body: JSON.stringify({ poolName, poolType }),
    })
    return await request.json()
  },
}

export default apiClient
