import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps, ButtonType, ButtonSize } from './button'

describe('test Button component', () => {
  it('should render the correct default button', () => {
    const defaultProps = {
      onClick: jest.fn(),
    }
    const wrapper = render(<Button {...defaultProps}>Test</Button>)
    const element = wrapper.getByText('Test')

    expect(element).toBeInTheDocument()

    expect(element.tagName).toEqual('BUTTON')
    expect(element.disabled).toBeFalsy()

    expect(element).toHaveClass('b-btn b-btn-default')

    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })

  it('should render the correct component based on different props', () => {
    const testProps: ButtonProps = {
      btnType: ButtonType.Primary,
      size: ButtonSize.Large,
      className: 'test-class',
    }
    const wrapper = render(<Button {...testProps}>Test</Button>)
    const element = wrapper.getByText('Test')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('b-btn-primary b-btn--large test-class')
  })

  it('should render a link when btnType equals to link and href is provided', () => {
    const testAnchorProps: ButtonProps = {
      btnType: ButtonType.Link,
      href: 'https://qq.com',
    }
    const wrapper = render(<Button {...testAnchorProps}>Test</Button>)
    const element = wrapper.getByText('Test')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('b-btn b-btn-link')
  })

  it('should render disabled button when prop disabled set to true', () => {
    const testProps: ButtonProps = {
      disabled: true,
      onClick: jest.fn(),
    }
    const wrapper = render(<Button {...testProps}>Test</Button>)
    const element = wrapper.getByText('Test')
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()

    fireEvent.click(element)
    expect(testProps.onClick).not.toHaveBeenCalled()
  })

  it('should render a disabled link when prop type is link and prop disabled is true', () => {
    const testProps: ButtonProps = {
      btnType: 'link',
      disabled: true,
    }
    const wrapper = render(<Button {...testProps}>Test</Button>)
    const element = wrapper.getByText('Test')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('b-btn--disabled')
  })
})
