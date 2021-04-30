import React from 'react'
import { useRecoilState } from 'recoil'
import { addDialogOpen } from '../store'
import { Dialog } from '@material-ui/core'

const SongAddDialog = () => {
  const [open, setOpen] = useRecoilState(addDialogOpen)

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      ㅁㄴㅇㄹ
    </Dialog>
  )
}

export default SongAddDialog
