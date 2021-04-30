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
import { Close } from '@material-ui/icons'

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
        <TextField fullWidth placeholder='곡 제목 또는 URL을 입력해주세요' />
      </DialogContent>
    </Dialog>
  )
}

export default SongAddDialog
