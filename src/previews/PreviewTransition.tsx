import React, { useState } from 'react';
import Transition from '../components/Transition/transition'
import Button from '../components/Button/button'

function PreviewTransitio() {
  const [show, setShow] = useState(false)

  return (
    <div>
      <h1>Button</h1>
      <Button onClick={() => {setShow(!show)}}>Toggle</Button>
      <hr/>
      <Transition
        in={show}
        timeout={300}
        animation="zoom-in-left"
      >
        <p style={{'border': '1px solid #000'}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, alias ipsum ullam ad autem blanditiis atque enim aspernatur eum nihil minus quaerat magni. Veniam, ut tempore quae labore atque amet?</p>
      </Transition>
      <hr/>
      <Transition
        in={show}
        timeout={300}
        animation="zoom-in-left"
        wrapper
      >
        <Button size="large">Large</Button>
      </Transition>
    </div>
  );
}

export default PreviewTransitio;
