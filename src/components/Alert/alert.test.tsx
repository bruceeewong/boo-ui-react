import React from 'react'
// @ts-ignore
import { render, cleanup, fireEvent, wait } from '@testing-library/react'
import Alert, { AlertProps, AlertType } from './alert'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'

library.add(fas) // import all icons

describe('test Alert component', () => {
  it('should render with no props provided', () => {
    const wrapper = render(<Alert />)
    const element = wrapper.getByTestId('alert')
    expect(element).toBeInTheDocument()

    const closeIcon = wrapper.getByTestId('alert-close')
    expect(closeIcon).toBeInTheDocument()
  })

  it('should hide alert && call onClose callback when click the close icon', async () => {
    const testProps = {
      onClose: jest.fn(),
    }

    const wrapper = render(<Alert {...testProps} />)
    const closeIcon = wrapper.getByTestId('alert-close')
    fireEvent.click(closeIcon)
    // call callback
    expect(testProps.onClose).toHaveBeenCalled()

    await wait(() => {
      // hide alert
      expect(wrapper.queryByTestId('alert')).not.toBeInTheDocument()
    })
  })

  it('should render correct title when set prop title', () => {
    const testProps: AlertProps = {
      title: 'custom',
    }
    const wrapper = render(<Alert {...testProps} />)
    const element = wrapper.getByText('custom')
    expect(element).toBeInTheDocument()
  })

  it('should render correct color when set prop alertType', () => {
    const alertTypes = ['default', 'success', 'danger', 'warning']

    alertTypes.forEach(async (alertType) => {
      cleanup()
      let wrapper = render(<Alert alertType={alertType as AlertType} />)
      const element = wrapper.getByTestId('alert')
      expect(element).toHaveClass(`b-alert b-alert-${alertType}`)
    })
  })

  it('should render correct content when set prop content', () => {
    const testProps: AlertProps = {
      content: 'custom content',
    }
    const wrapper = render(<Alert {...testProps} />)
    const element = wrapper.getByText('custom content')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('b-alert-content')
  })

  it('should not render close icon when set prop closable false', () => {
    const testProps: AlertProps = {
      closable: false,
    }
    const wrapper = render(<Alert {...testProps} />)

    const closeIcon = wrapper.queryByTestId('alert-close')
    expect(closeIcon).not.toBeInTheDocument()
  })
})
