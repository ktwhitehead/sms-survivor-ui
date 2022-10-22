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
    const { appUser } = await request.json()
    return appUser
  },
  getPools: async (owner: any) => {
    const request = await fetch(`${apiUrl}/owner/${owner?.appUser?.id}/pools`, headers(owner))
    const { pools } = await request.json()
    return pools
  },
  getPool: async (owner: any, poolId: any) => {
    const request = await fetch(`${apiUrl}/${owner?.appUser?.id}/pool/${poolId}`, headers(owner))
    const { pool } = await request.json()
    return pool
  },
  createPool: async ({ owner, poolName, poolType, poolLeague }: any) => {
    const request = await fetch(`${apiUrl}/owner/${owner?.appUser?.id}/create-pool`, {
      ...headers(owner),
      body: JSON.stringify({ poolName, poolType, poolLeague }),
    })
    const { pool } = await request.json()
    return pool
  },
  invitePlayer: async ({ owner, playerName, playerNumber, poolId }: any) => {
    const ownerName = owner?.amplifyUser?.attributes?.name
    const request = await fetch(`${apiUrl}/${owner?.appUser?.id}/pool/${poolId}/invite-player`, {
      ...headers(owner),
      body: JSON.stringify({ ownerName, playerName, playerNumber }),
    })
    const { player } = await request.json()
    return player
  },
}

export default apiClient
