import React from 'react';
import Alert, { AlertType } from '../components/Alert/alert'

function PreviewButton() {
  return (
    <div>
      <h1>Alert</h1>
      <Alert />
      <hr/>
      <Alert title="Hello World" />
      <hr/>
      <Alert alertType={AlertType.DEFAULT} />
      <Alert alertType={AlertType.SUCCESS} />
      <Alert alertType={AlertType.WARNING} />
      <Alert alertType={AlertType.DANGER} />
      <hr/>
      <Alert title="Not Closable" closable={false} />
      <hr/>

      <Alert 
        title="title"
        content="Lorem ipsum dolor sit amet"
      />
    </div>
  );
}

export default PreviewButton;
