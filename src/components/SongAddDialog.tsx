import React from 'react'
import { useRecoilState } from 'recoil'
import { addDialogOpen } from '../store'
import {
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { Close, Search } from '@material-ui/icons'
import ytsr from 'ytsr'
// import ytdl from 'ytdl-core'

const SongAddDialog = () => {
  const [open, setOpen] = useRecoilState(addDialogOpen)
  const [search, setSearch] = React.useState('')
  const [alert, setAlert] = React.useState(null)

  const searchProcess = async () => {
    // const data = await ytsr(search)
    // console.log(data.items)
    console.log(await ytsr(search))
  }

  return (
    <Dialog
      open={open}
      disableBackdropClick
      onClose={() => setOpen(false)}
      fullWidth
    >
      <Toolbar>
        <Typography variant='h6'>영상 추가하기</Typography>
        <div style={{ flexGrow: 1 }} />
        <IconButton onClick={() => setOpen(false)}>
          <Close />
        </IconButton>
      </Toolbar>
      <DialogContent>
        {alert}
        <div style={{ display: 'flex', gap: 8 }}>
          <TextField
            style={{ flexGrow: 1 }}
            placeholder='영상 또는 재생목록 URL을 입력해주세요'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconButton onClick={searchProcess}>
            <Search />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SongAddDialog
