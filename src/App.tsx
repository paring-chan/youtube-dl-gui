import React from 'react'
import { Container, CssBaseline, Typography } from '@material-ui/core'
import Header from './components/Header'
import { RecoilRoot } from 'recoil'
import SongAddDialog from './components/SongAddDialog'
import TrackList from './components/TrackList'
import { SnackbarProvider } from 'notistack'
import DownloadSection from './components/DownloadSection'
import LogModal from './components/LogModal'

function App() {
  return (
    <SnackbarProvider>
      <RecoilRoot>
        <CssBaseline />
        <Header />
        <SongAddDialog />
        <LogModal />
        <Container>
          <DownloadSection />
          <Typography variant='h4' gutterBottom>
            추가된 영상 목록
          </Typography>
          <TrackList />
        </Container>
      </RecoilRoot>
    </SnackbarProvider>
  )
}

export default App
