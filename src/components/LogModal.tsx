import React from 'react'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { useRecoilValue } from 'recoil'
import { currentState, formatState, logModalOpen } from '../store'

const LogModal = () => {
  const open = useRecoilValue(logModalOpen)
  const state = useRecoilValue(currentState)
  const format = useRecoilValue(formatState)

  return (
    <Dialog open={open}>
      {state ? (
        <>
          <DialogTitle>다운로드중: {state.title}</DialogTitle>
          <DialogContent>
            <img src={state.thumbnail} width='100%' alt='thumbnail' />
          </DialogContent>
        </>
      ) : (
        <>
          <DialogTitle>다운로드 대기중..</DialogTitle>
        </>
      )}
    </Dialog>
  )
}

export default LogModal
