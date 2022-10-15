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
    const request = await fetch(`${apiUrl}/owner/${owner?.appUser?.id}/pools`, headers(owner))
    return await request.json()
  },
  getPool: async (owner: any, poolId: any) => {
    const request = await fetch(`${apiUrl}/${owner?.appUser?.id}/pool/${poolId}`, headers(owner))
    return await request.json()
  },
  createPool: async ({ owner, poolName, poolType, poolLeague }: any) => {
    const request = await fetch(`${apiUrl}/owner/${owner?.appUser?.id}/create-pool`, {
      ...headers(owner),
      body: JSON.stringify({ poolName, poolType, poolLeague }),
    })
    return await request.json()
  },
  invitePlayer: async ({ owner, playerName, playerNumber, poolId }: any) => {
    const ownerName = owner?.amplifyUser?.attributes?.name
    const request = await fetch(`${apiUrl}/${owner?.appUser?.id}/pool/${poolId}/invite-player`, {
      ...headers(owner),
      body: JSON.stringify({ ownerName, playerName, playerNumber }),
    })
    return await request.json()
  },
}

export default apiClient
