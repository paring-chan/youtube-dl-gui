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
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  List as MUIList,
  TextField,
  Toolbar,
  Typography,
  ListItemAvatar,
  Avatar,
  ListItemSecondaryAction,
} from '@material-ui/core'
import { Add, Close, List, Search } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'
import { videoInfo } from 'ytdl-core'
import { Result } from 'ytpl'
import { useSnackbar } from 'notistack'

declare var utils: any

const SongAddDialog = () => {
  const [open, setOpen] = useRecoilState(addDialogOpen)
  const [search, setSearch] = React.useState('')
  const [alert, setAlert] = React.useState<null | string>(null)
  const [res, setRes] = React.useState<videoInfo | Result | null>(null)
  const [loading, setLoading] = React.useState(false)
  const [tracks, setTracks] = useRecoilState(tracksState)
  const { enqueueSnackbar } = useSnackbar()

  const getInfoFromVideo = async () => {
    setRes(null)
    setAlert(null)
    setLoading(true)
    try {
      try {
        const data = await utils.ytpl(search, {
          limit: Infinity,
        })
        return setRes(data)
      } catch {
        const data = await utils.ytdl.getInfo(search)
        setRes(data)
      }
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
        {alert && (
          <Alert severity='error' style={{ marginTop: 10 }}>
            {alert}
          </Alert>
        )}
        <div style={{ display: 'flex', marginTop: 10 }}>
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
          {res && 'videoDetails' in res && (
            <Card variant='outlined'>
              <CardMedia
                component='img'
                alt='thumbnail'
                image={
                  res.videoDetails.thumbnails[
                    res.videoDetails.thumbnails.length - 1
                  ].url
                }
              />
              <CardContent
                style={{ display: 'flex', gap: 8, flexDirection: 'column' }}
              >
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

                      const patched = [...tracks]

                      patched.push({
                        id: v.videoId,
                        title: v.title,
                        thumbnail: v.thumbnails[v.thumbnails.length - 1].url,
                        author: v.author.name,
                      })

                      setTracks(patched)

                      enqueueSnackbar('영상이 추가되었습니다.', {
                        variant: 'success',
                      })
                      setOpen(false)
                    }}
                  >
                    추가하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          {res && 'items' in res && (
            <Card variant='outlined'>
              <CardContent
                style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
              >
                <div>
                  <Typography variant='h5'>
                    <List /> {res.title}
                  </Typography>
                  <Typography
                    variant='body1'
                    color='textSecondary'
                    component='p'
                  >
                    {res.author.name}
                  </Typography>
                </div>
              </CardContent>
              <Divider />
              <div
                style={{
                  padding: 4,
                }}
              >
                <Button
                  variant='outlined'
                  color='primary'
                  fullWidth
                  onClick={() => {
                    let patched = [...tracks]
                    patched.push(
                      ...res.items
                        .filter((x) => !patched.find((y) => x.id === y.id))
                        .map((x) => ({
                          id: x.id,
                          title: x.title,
                          thumbnail: x.bestThumbnail.url,
                          author: x.author.name,
                        }))
                    )
                    setTracks(patched)
                    enqueueSnackbar(
                      `영상 ${res.items.length}개가 추가되었습니다.`,
                      {
                        variant: 'success',
                      }
                    )
                    setOpen(false)
                  }}
                >
                  영상 {res.items.length}개 추가하기
                </Button>
              </div>
              <MUIList>
                {res.items.map((x, y) => (
                  <ListItem key={y}>
                    <ListItemAvatar>
                      <Avatar src={x.bestThumbnail.url || undefined} />
                    </ListItemAvatar>
                    <ListItemText primary={x.title} />
                    <ListItemSecondaryAction>
                      <IconButton
                        disabled={!!tracks.find((i) => x.id === i.id)}
                        onClick={() => {
                          let patched = [...tracks]
                          patched.push({
                            id: x.id,
                            title: x.title,
                            thumbnail: x.bestThumbnail.url,
                            author: x.author.name,
                          })
                          setTracks(patched)
                        }}
                      >
                        <Add />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </MUIList>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SongAddDialog
