import React from 'react';
import Button from '../components/Button/button'

function PreviewButton() {
  return (
    <div>
      <h1>Button</h1>
      <Button size="small">Small</Button>
      <Button>Normal</Button>
      <Button size="large">Large</Button>
      <hr/>

      <Button btnType="default">Default</Button>
      <Button btnType="primary">Primary</Button>
      <Button btnType="danger">Danger</Button>
      <Button btnType="link" href="https://qq.com">Link</Button>
      <hr/>

      <Button disabled>Button</Button>
      <Button btnType="link" disabled>Link</Button>
      <hr/>
      
      <p>Test Function</p>
      <Button className="custom">Custom class</Button>
      <Button btnType="link" href="https://qq.com" target="__blank">Visit QQ</Button>
    </div>
  );
}

export default PreviewButton;
