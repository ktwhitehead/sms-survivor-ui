import React, { useContext } from 'react'
import AppContext from '../../Context/AppContext'

const Loader = () => {
  const { isLoading } = useContext(AppContext)
  return (
    <div />
  )
}

export default Loader
