import React from 'react';
import Icon from '../components/Icon/icon'

function PreviewButton() {
  return (
    <div>
      <h1>Icon</h1>
      <h4>Default</h4>
      <Icon icon="coffee" />
      <hr/>
      <h4>Color</h4>
      <Icon theme="primary" icon="coffee" />
      <Icon theme="secondary" icon="coffee" />
      <Icon theme="success" icon="coffee" />
      <Icon theme="warning" icon="coffee" />
      <Icon theme="danger" icon="coffee" />
      <hr/>
      <h4>Size</h4>
      <Icon theme="primary" icon="coffee" size="10x" />
      <hr/>
    </div>
  );
}

export default PreviewButton;
