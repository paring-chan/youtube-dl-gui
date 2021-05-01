import React from 'react'
import { useRecoilState } from 'recoil'
import { tracksState } from '../store'
import {
  List,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Card,
  ListItemSecondaryAction,
  IconButton,
} from '@material-ui/core'
import { Delete } from '@material-ui/icons'

const TrackList = () => {
  const [tracks, setTracks] = useRecoilState(tracksState)
  return tracks.length ? (
    <Card variant='outlined'>
      <List>
        {tracks.map((x, i) => (
          <ListItem key={i}>
            <ListItemAvatar>
              <Avatar src={x.thumbnail} />
            </ListItemAvatar>
            <ListItemText primary={x.title} secondary={x.author} />
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => {
                  const patched = tracks.filter((y) => y.id !== x.id)
                  setTracks(patched)
                }}
              >
                <Delete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Card>
  ) : (
    <Typography variant='body1' color='textSecondary'>
      추가된 영상이 없습니다.
    </Typography>
  )
}

export default TrackList
