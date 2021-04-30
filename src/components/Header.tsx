import React from 'react'
import { IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import { useSetRecoilState } from 'recoil'
import { addDialogOpen } from '../store'

const Header = () => {
  const setDialogOpen = useSetRecoilState(addDialogOpen)

  return (
    <Toolbar>
      <Typography variant='h6'>Youtube-DL</Typography>
      <div style={{ flexGrow: 1 }} />
      <Tooltip title='추가하기'>
        <IconButton onClick={() => setDialogOpen(true)}>
          <Add />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

export default Header
