import { atom } from 'recoil'

export const tracksState = atom<any[]>({
  key: 'tracks',
  default: [],
})

export const addDialogOpen = atom<boolean>({
  key: 'addDialogOpen',
  default: false,
})

export const logModalOpen = atom<boolean>({
  key: 'logModalOpen',
  default: false,
})

export const currentState = atom<any>({
  key: 'currentState',
  default: null,
})
