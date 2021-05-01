import React from 'react'
import {
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core'

const DownloadSection = () => {
  const [format, setFormat] = React.useState('mp4')
  const [dir, setDir] = React.useState('')

  const selectCallback = (event: MessageEvent<any>) => {
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
    </Card>
  )
}

export default DownloadSection
