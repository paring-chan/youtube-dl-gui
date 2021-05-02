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
  audioProgressState,
  currentState,
  dirState,
  formatState,
  logModalOpen,
  tracksState,
  videoProgressState,
} from '../store'
import { useSnackbar } from 'notistack'
import { Readable } from 'stream'
import path from 'path'
import sanitize from 'sanitize-filename'

declare var utils: any

const DownloadSection = () => {
  const [format, setFormat] = useRecoilState(formatState)
  const [dir, setDir] = useRecoilState(dirState)
  const setLogModal = useSetRecoilState(logModalOpen)
  const setCurrentState = useSetRecoilState(currentState)
  const [tracks, setTracks] = useRecoilState(tracksState)
  const { enqueueSnackbar } = useSnackbar()
  const setAudioProgress = useSetRecoilState(audioProgressState)
  const setVideoProgress = useSetRecoilState(videoProgressState)

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
              setCurrentState(track)
              setAudioProgress(0)
              setVideoProgress(0)
              if (format === 'mp4') {
                await new Promise<void>(async (resolve) => {
                  const video = (utils.ytdl(track.id, {
                    quality: 'highestvideo',
                  }) as Readable).on('progress', (_, progress, total) => {
                    setVideoProgress((progress / total) * 100)
                  })
                  const audio = (utils.ytdl(track.id, {
                    quality: 'highestaudio',
                  }) as Readable).on('progress', (_, progress, total) => {
                    setAudioProgress((progress / total) * 100)
                  })

                  const ffmpegProcess = utils.cp.spawn(
                    utils.ffmpeg,
                    [
                      '-hide_banner',
                      '-i',
                      'pipe:3',
                      '-i',
                      'pipe:4',
                      '-map',
                      '0:a',
                      '-map',
                      '1:v',
                      path.join(dir, sanitize(track.title + '.mp4')),
                    ],
                    {
                      windowsHide: true,
                      stdio: ['inherit', 'inherit', 'inherit', 'pipe', 'pipe'],
                    }
                  )

                  ffmpegProcess.on('close', () => {
                    resolve()
                  })

                  audio.pipe(ffmpegProcess.stdio[3] as any)
                  video.pipe(ffmpegProcess.stdio[4] as any)
                })
              } else if (format === 'mp3') {
                const stream = utils.ytdl(track.id, {
                  quality: 'highestaudio',
                })
                await new Promise<void>((resolve) => {
                  utils
                    .fluentFFmpeg(stream)
                    .audioBitrate(128)
                    .outputOptions([
                      '-id3v2_version',
                      '4',
                      '-metadata',
                      'title=' + track.title,
                      '-metadata',
                      'artist=' + track.author,
                    ])
                    .save(path.join(dir, sanitize(track.title + '.mp3')))
                    .on('end', () => {
                      resolve()
                    })
                })
              }
            }
            setTracks([])
            setCurrentState(null)
            setLogModal(false)
          }}
        >
          다운로드 시작
        </Button>
      </CardActions>
    </Card>
  )
}

export default DownloadSection
