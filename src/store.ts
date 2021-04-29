import { atom } from 'recoil'

export const tracksState = atom<any[]>({
  key: 'tracks',
  default: [],
})
