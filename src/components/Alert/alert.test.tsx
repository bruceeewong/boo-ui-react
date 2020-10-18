import React from 'react'
import { render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert, { AlertProps, AlertTypeProp } from './alert'

describe('test Alert component', () => {
  it('should render with no props provided', () => {
    const wrapper = render(<Alert />)    
    const element = wrapper.getByTestId('alert')
    expect(element).toBeInTheDocument()

    const closeIcon = wrapper.getByText('x')
    expect(closeIcon).toBeInTheDocument()
  })

  it('should hide alert && call onClose callback when click the close icon', () => {
    const testProps = {
      onClose: jest.fn(),
    }

    const wrapper = render(<Alert {...testProps} />)    
    const closeIcon = wrapper.getByText('x')
    userEvent.click(closeIcon)
    // hide alert
    expect(wrapper.queryByTestId('alert')).toHaveClass('alert--hide')
    // call callback
    expect(testProps.onClose).toHaveBeenCalled()
  })

  it('should render correct title when set prop title', () => {
    const testProps: AlertProps = {
      title: 'custom'
    }
    const wrapper = render(<Alert {...testProps} />)    
    const element = wrapper.getByText('custom')
    expect(element).toBeInTheDocument()
  })

  it('should render correct color when set prop alertType', () => {
    const alertTypes = ['default', 'success', 'danger', 'warning']

    alertTypes.forEach(async alertType => {
      cleanup()
      let wrapper = render(<Alert alertType={alertType as AlertTypeProp} />)    
      const element = wrapper.getByTestId('alert')
      expect(element).toHaveClass(`alert alert--${alertType}`)
    })
  })

  it('should render correct content when set prop content', () => {
    const testProps: AlertProps = {
      content: 'custom content'
    }
    const wrapper = render(<Alert {...testProps} />)    
    const element = wrapper.getByText('custom content')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('alert-content')
  })
  it('should not render close icon when set prop closable false', () => {
    const testProps: AlertProps = {
      closable: false
    }
    const wrapper = render(<Alert {...testProps} />)

    const closeIcon = wrapper.queryByText('x')
    expect(closeIcon).not.toBeInTheDocument()
  })
})
