import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Button from './button'

const defaultBtn = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const btnWithSize = () => (
  <div>
    <Button size="small">small button</Button>
    <Button size="large">large button</Button>
  </div>
)

const btnWithType = () => (
  <div>
    <Button btnType="default">default button</Button>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">danger button</Button>
    <Button btnType="link" href="#">
      link button
    </Button>
  </div>
)

storiesOf('Button Component', module)
  .addParameters({
    info: {
      text:
        'A lovely button component, support default, primary, danger and link type',
      inline: true,
    },
  })
  .add('Button', defaultBtn)
  .add('Button 尺寸', btnWithSize)
  .add('Button 类型', btnWithType)
