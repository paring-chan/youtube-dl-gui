import React from 'react'
import { useRecoilState } from 'recoil'
import { tracksState } from '../store'
import { List, Typography } from '@material-ui/core'

const TrackList = () => {
  const [tracks, setTracks] = useRecoilState(tracksState)
  return tracks.length ? (
    <List></List>
  ) : (
    <Typography variant='body1' color='textSecondary'>
      추가된 영상이 없습니다.
    </Typography>
  )
}

export default TrackList
