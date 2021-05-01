import React from 'react'
import { useRecoilState } from 'recoil'
import { addDialogOpen, tracksState } from '../store'
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Close, Search } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { videoInfo } from 'ytdl-core'

declare var utils: any

const SongAddDialog = () => {
  const [open, setOpen] = useRecoilState(addDialogOpen)
  const [search, setSearch] = React.useState('')
  const [alert, setAlert] = React.useState<null | string>(null)
  const [tab, setTab] = React.useState(0)
  const [res, setRes] = React.useState<videoInfo | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [tracks, setTracks] = useRecoilState(tracksState)

  const getInfoFromVideo = async () => {
    setRes(null)
    setAlert(null)
    setLoading(true)
    try {
      const data = await utils.ytdl.getInfo(search)
      setRes(data)
    } catch (e) {
      setAlert(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog
      open={open}
      disableBackdropClick
      onClose={() => setOpen(false)}
      fullWidth
    >
      <Toolbar>
        <Typography variant='h6'>영상/재생목록 추가하기</Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={() => setOpen(false)} disabled={loading}>
          <Close />
        </IconButton>
      </Toolbar>
      <DialogContent>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} disabled={loading}>
          <Tab label='영상 추가하기' />
          <Tab label='채널/재생목록 추가하기' />
        </Tabs>
        {alert && (
          <Alert color='error' style={{ marginTop: 10 }}>
            {alert}
          </Alert>
        )}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <TextField
            style={{ flexGrow: 1 }}
            placeholder='URL을 입력해주세요'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loading}
          />
          <IconButton disabled={loading} onClick={getInfoFromVideo}>
            <Search />
          </IconButton>
        </div>
        <div style={{ marginTop: 5, marginBottom: 10 }}>
          {res && res.videoDetails && (
            <Card>
              <CardMedia
                component='img'
                alt='thumbnail'
                image={`https://i.ytimg.com/vi/${res.videoDetails.videoId}/maxresdefault.jpg`}
              />
              <CardContent style={{ display: 'flex' }}>
                <div style={{ flexGrow: 1 }}>
                  <Typography variant='h5'>{res.videoDetails.title}</Typography>
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    component='p'
                  >
                    {res.videoDetails.author.name}
                  </Typography>
                </div>
                <div>
                  <Button
                    variant='outlined'
                    color='primary'
                    onClick={() => {
                      if (
                        tracks.find((x) => x.id === res!.videoDetails.videoId)
                      ) {
                        return setAlert('이미 추가된 영상입니다.')
                      }
                      const v = res!.videoDetails

                      tracks.push({
                        id: v.videoId,
                        title: v.title,
                        thumbnail: `https://i.ytimg.com/vi/${res.videoDetails.videoId}/maxresdefault.jpg`,
                        author: v.author.name,
                      })
                    }}
                  >
                    추가하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SongAddDialog
