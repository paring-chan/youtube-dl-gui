import React from 'react'
import { useRecoilState } from 'recoil'
import { addDialogOpen } from '../store'
import { Dialog, DialogTitle } from '@material-ui/core'

const SongAddDialog = () => {
  const [open, setOpen] = useRecoilState(addDialogOpen)

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>영상 추가하기</DialogTitle>
    </Dialog>
  )
}

export default SongAddDialog
