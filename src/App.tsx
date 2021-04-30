import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Header from './components/Header'
import { RecoilRoot } from 'recoil'
import SongAddDialog from './components/SongAddDialog'

function App() {
  return (
    <RecoilRoot>
      <CssBaseline />
      <Header />
      <SongAddDialog />
      app
    </RecoilRoot>
  )
}

export default App
