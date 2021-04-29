import React from 'react';

function App() {
  return (
    <>
      {
        global.process.platform === 'darwin' && (
            <>
              {/* @ts-ignore */}
              <div style={{width: '100vw', height: 35, WebkitAppRegion: 'drag', position: 'fixed'}} />
            </>
        )
      }
    </>
  );
}

export default App;
