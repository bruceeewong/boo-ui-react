import React from 'react'
import { render, RenderResult, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index={0}>
        active
      </MenuItem>
      <MenuItem index={1} disabled>
        disabled
      </MenuItem>
      <MenuItem index={2}>
        xyz
      </MenuItem>
    </Menu>
  )
}

let wrapper: RenderResult, 
  menuElement: HTMLElement, 
  activeElement: HTMLElement, 
  disabledElement: HTMLElement,
  testProps: MenuProps

describe('test Menu and MenuItem component', () => {
  beforeEach(() => {
    testProps = {
      defaultIndex: 0,
      className: 'test',
      onSelect: jest.fn(),
    }
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu and MenuItem based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass('b-menu test')
    expect(menuElement.getElementsByTagName('li').length).toEqual(3)
    expect(activeElement).toHaveClass('b-menu-item b-menu-item--active')
    expect(disabledElement).toHaveClass('b-menu-item b-menu-item--disabled')
  })

  it('should change active and call callback with active index when click items', () => {
    const thirdItem = wrapper.getByText('xyz')
    userEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('b-menu-item b-menu-item--active')
    expect(activeElement).not.toHaveClass('b-menu-item--active')
    expect(testProps.onSelect).toHaveBeenCalledWith(2)
  })

  it('should not change active and call callback when click disabled items', () => {
    wrapper = render(generateMenu(testProps))
    userEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('b-menu-item--active')
    expect(testProps.onSelect).not.toHaveBeenCalled()
  })

  it('should render virtical mode when prop mode is vertical', () => {
    testProps = {
      defaultIndex: 0,
      mode: 'vertical',
    }

    cleanup()
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('menu')
    expect(menuElement).toHaveClass('b-menu--vertical')
  })
})