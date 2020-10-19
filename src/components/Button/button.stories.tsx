import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {withInfo} from '@storybook/addon-info'

import Button from './button'

const defaultBtn = () => (
  <Button onClick={action('clicked')}>default button</Button>
)

const btnWithSize = () => (
  <>
    <Button size="small">small button</Button>
    <Button size="large">large button</Button>
  </>
)

const btnWithType = () => (
  <>
    <Button btnType="default">default button</Button>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">danger button</Button>
    <Button btnType="link" href="#">link button</Button>
  </>
)

storiesOf('Button Component', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: 'this is a nice component',
      inline: true,
    }
  })
  .add('默认 Button', defaultBtn)
  .add('Button 尺寸', btnWithSize)
  .add('Button 类型', btnWithType)
