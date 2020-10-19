import React from 'react';
import PreviewButton from './previews/PreviewButton'
import PreviewAlert from './previews/PreviewAlert'
import PreviewMenu from './previews/PreviewMenu'

function App() {
  return (
    <div>
      <PreviewButton />
      <hr/>
      <PreviewAlert />
      <hr/>
      <PreviewMenu />
    </div>
  );
}

export default App;
