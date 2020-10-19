import React from 'react';
import Alert from '../components/Alert/alert'

function PreviewAlert() {
  return (
    <div>
      <h1>Alert</h1>
      <Alert />
      <hr/>
      <Alert title="Hello World" />
      <hr/>
      <Alert title="default" alertType="default" />
      <Alert title="success" alertType="success" />
      <Alert title="warning" alertType="warning" />
      <Alert title="danger" alertType="danger" />
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

export default PreviewAlert;
