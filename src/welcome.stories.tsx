import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Welcome page', module).add(
  'welcome',
  () => {
    return (
      <>
        <h1>欢迎来到 Boo UI React</h1>
        <p>Boo UI 是 Bruski 制作的 React 组件库, 主要用于个人使用以及学习.</p>
        <h3>安装试试</h3>
        <code>npm install boo-ui-react --save</code>
      </>
    )
  },
  {
    info: { disabled: true },
  }
)
