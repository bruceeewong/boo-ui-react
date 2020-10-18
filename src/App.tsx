import React from 'react';
import Button, { ButtonType, ButtonSize } from './components/Button/button'

function App() {
  return (
    <div>
      <h1>Button</h1>
      <Button size={ButtonSize.Small}>Small</Button>
      <Button>Normal</Button>
      <Button size={ButtonSize.Large}>Large</Button>
      <hr/>

      <Button btnType={ButtonType.Primary}>Primary</Button>
      <Button btnType={ButtonType.Danger}>Danger</Button>
      <Button btnType={ButtonType.Default}>Default</Button>
      <Button btnType={ButtonType.Link} href="https://qq.com">Link</Button>
      <hr/>

      <Button disabled>Button</Button>
      <Button btnType={ButtonType.Link} disabled>Link</Button>
      <hr/>
      
      <p>Test Function</p>
      <Button className="custom">Custom class</Button>
      <Button btnType={ButtonType.Link} href="https://qq.com" target="__blank">Visit QQ</Button>
    </div>
  );
}

export default App;
