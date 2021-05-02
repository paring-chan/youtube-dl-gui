import React, { useRef } from 'react'
import { CardContent, Dialog } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import { logModalOpen } from '../store'
import XTerm from 'react-xterm'

const LogModal = () => {
  const ref = useRef<any>()
  const open = useRecoilValue(logModalOpen)

  return (
    <Dialog open={open}>
      <CardContent>
        <XTerm ref={ref} addons={['fit', 'fullscreen', 'search']} />
      </CardContent>
    </Dialog>
  )
}

export default LogModal
