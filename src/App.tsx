import React from 'react'
import { Container, CssBaseline, Typography } from '@material-ui/core'
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
      <Container
        style={{
          margin: '20px 20px 0 20px',
        }}
      >
        <Typography variant='h4' gutterBottom>
          추가된 영상 목록
        </Typography>
        <TrackList />
      </Container>
    </RecoilRoot>
  )
}

export default App
