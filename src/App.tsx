import React from 'react';
// import PreviewButton from './previews/PreviewButton'
// import PreviewAlert from './previews/PreviewAlert'
// import PreviewMenu from './previews/PreviewMenu'
import PreviewIcon from './previews/PreviewIcon'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas)

function App() {
  return (
    <div>
      {/* <PreviewButton />
      <hr/>
      <PreviewAlert />
      <hr/> */}
      {/* <PreviewMenu /> */}
      <PreviewIcon />
    </div>
  );
}

export default App;
