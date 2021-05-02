import React from 'react'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'
import { useRecoilState, useSetRecoilState } from 'recoil'
import {
  currentState,
  dirState,
  formatState,
  logModalOpen,
  tracksState,
} from '../store'
import { useSnackbar } from 'notistack'
import { Readable } from 'stream'

declare var utils: any

const DownloadSection = () => {
  const [format, setFormat] = useRecoilState(formatState)
  const [dir, setDir] = useRecoilState(dirState)
  const setLogModal = useSetRecoilState(logModalOpen)
  const setCurrentState = useSetRecoilState(currentState)
  const [tracks] = useRecoilState(tracksState)
  const { enqueueSnackbar } = useSnackbar()

  const selectCallback = (event: MessageEvent) => {
    setDir(event.data.data)
  }

  React.useEffect(() => {
    window.addEventListener('message', selectCallback)
    return () => {
      window.removeEventListener('message', selectCallback)
    }
  })

  return (
    <Card
      variant='outlined'
      style={{
        marginBottom: 10,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='select--format'>포맷</InputLabel>
              <Select
                required
                value={format}
                onChange={(x) => setFormat(x.target.value as string)}
                labelId='select--format'
              >
                <MenuItem value='mp4'>MP4</MenuItem>
                <MenuItem value='mp3'>MP3</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              {/*@ts-ignore*/}
              <TextField
                label='다운로드할 폴더'
                required
                onClick={() => {
                  window.postMessage({ type: 'select-dir' }, '*')
                }}
                value={dir || ''}
                inputProps={{
                  readOnly: true,
                  onChange: (e) => setDir((e.target as any).value),
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button
          fullWidth
          variant='outlined'
          color='primary'
          onClick={async () => {
            if (!tracks.length) {
              enqueueSnackbar('다운로드 대기열이 비었습니다.', {
                variant: 'error',
              })
              return
            }
            if (!dir) {
              enqueueSnackbar('다운로드 폴더를 선택해주세요.', {
                variant: 'error',
              })
              return
            }
            setLogModal(true)
            for (const track of tracks) {
              if (format === 'mp4') {
                const video = utils.ytdl(track.id, {
                  quality: 'highestvideo',
                }) as Readable
                const audio = (await utils.ytdl(track.id, {
                  quality: 'highestaudio',
                })) as Readable
                setCurrentState(track)
              }
            }
          }}
        >
          다운로드 시작
        </Button>
      </CardActions>
    </Card>
  )
}

export default DownloadSection
