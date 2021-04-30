import { atom } from 'recoil'

export const tracksState = atom<any[]>({
  key: 'tracks',
  default: [],
})

export const addDialogOpen = atom<boolean>({
  key: 'addDialogOpen',
  default: false,
})
