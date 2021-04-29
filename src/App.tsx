import React from 'react'
import { HashRouter, Route } from 'react-router-dom'
import Landing from './views/Landing'

function App() {
  return (
    <>
      {global.process.platform === 'darwin' && (
        <>
          {/* @ts-ignore */}
          <div
            style={{
              width: '100vw',
              height: 35,
              WebkitAppRegion: 'drag',
              position: 'fixed',
            }}
          />
        </>
      )}
      <div
        style={{
          padding: 40,
        }}
      >
        <HashRouter>
          <Route exact path='/' component={Landing} />
        </HashRouter>
      </div>
    </>
  )
}

export default App
