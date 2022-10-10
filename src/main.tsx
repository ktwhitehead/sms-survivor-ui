import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'
import { AppStyled } from './App.styled'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppStyled>
    <App />
  </AppStyled>,
)
