import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Header from './components/Header'
import { RecoilRoot } from 'recoil'
import SongAddDialog from './components/SongAddDialog'
import TrackList from './components/TrackList'

function App() {
  return (
    <RecoilRoot>
      <CssBaseline />
      <Header />
      <SongAddDialog />
      <TrackList />
    </RecoilRoot>
  )
}

export default App
