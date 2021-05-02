import React from 'react'
import { Dialog, DialogTitle } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import { currentState, logModalOpen } from '../store'

const LogModal = () => {
  const open = useRecoilValue(logModalOpen)
  const state = useRecoilValue(currentState)

  return (
    <Dialog open={open}>
      {state ? null : (
        <>
          <DialogTitle>다운로드 대기중..</DialogTitle>
        </>
      )}
    </Dialog>
  )
}

export default LogModal
