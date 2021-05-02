import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Typography,
} from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import {
  audioProgressState,
  currentState,
  formatState,
  logModalOpen,
  tracksState,
  videoProgressState,
} from '../store'

const LogModal = () => {
  const open = useRecoilValue(logModalOpen)
  const state = useRecoilValue(currentState)
  const format = useRecoilValue(formatState)
  const audio = useRecoilValue(audioProgressState)
  const video = useRecoilValue(videoProgressState)
  const tracks = useRecoilValue(tracksState)

  return (
    <Dialog open={open} fullWidth>
      {state ? (
        <>
          <LinearProgress
            variant='determinate'
            value={
              (tracks.findIndex((x) => x.id === state.id) / tracks.length) * 100
            }
          />
          <DialogTitle>다운로드중: {state.title}</DialogTitle>
          <DialogContent>
            <img src={state.thumbnail} width='100%' alt='thumbnail' />
            {format === 'mp4' && (
              <>
                <Typography
                  variant='body1'
                  gutterBottom
                  style={{ marginTop: 5 }}
                >
                  오디오
                </Typography>
                <LinearProgress value={audio} variant='determinate' />
                <Typography
                  variant='body1'
                  gutterBottom
                  style={{ marginTop: 5 }}
                >
                  비디오
                </Typography>
                <LinearProgress value={video} variant='determinate' />
              </>
            )}
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>다운로드 대기중..</DialogTitle>
        </>
      )}
    </Dialog>
  )
}

export default LogModal
