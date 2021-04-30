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

const SongAddDialog = () => {
  const [open, setOpen] = useRecoilState(addDialogOpen)

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
        <div style={{ display: 'flex', gap: 8 }}>
          <TextField
            style={{ flexGrow: 1 }}
            placeholder='영상 제목 또는 URL을 입력해주세요'
          />
          <IconButton>
            <Search />
          </IconButton>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SongAddDialog
