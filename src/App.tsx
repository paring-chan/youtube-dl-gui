import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Header from './components/Header'
import { RecoilRoot } from 'recoil'

function App() {
  return (
    <RecoilRoot>
      <CssBaseline />
      <Header />
      app
    </RecoilRoot>
  )
}

export default App
