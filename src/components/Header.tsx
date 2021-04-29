import React from 'react'
import { IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const Header = () => {
  return (
    <Toolbar>
      <Typography variant='h6'>Youtube-DL</Typography>
      <div style={{ flexGrow: 1 }} />
      <Tooltip title='추가하기'>
        <IconButton>
          <Add />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}

export default Header
