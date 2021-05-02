window.utils = {
  ytdl: require('ytdl-core'),
  ytpl: require('ytpl'),
  ffmpeg: require('ffmpeg-static'),
  cp: require('child_process'),
  fluentFFmpeg: require('fluent-ffmpeg'),
}

const { ipcRenderer } = require('electron')

ipcRenderer.on('select-dir-complete', (event, data) => {
  window.postMessage(
    {
      type: 'select-dir-complete',
      data,
    },
    '*'
  )
})

process.once('loaded', () => {
  window.addEventListener('message', (e) => {
    if (e.data.type === 'select-dir') {
      ipcRenderer.send('select-dir')
    }
  })
})
