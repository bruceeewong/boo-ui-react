import React from 'react'
// @ts-ignore
import { render, RenderResult, cleanup, fireEvent, wait } from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem index="0">
        active
      </MenuItem>
      <MenuItem index="1" disabled>
        disabled
      </MenuItem>
      <MenuItem index="2">
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
      defaultIndex: '0',
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
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('b-menu-item b-menu-item--active')
    expect(activeElement).not.toHaveClass('b-menu-item--active')
    expect(testProps.onSelect).toHaveBeenCalledWith('2')
  })

  it('should not change active and call callback when click disabled items', () => {
    wrapper = render(generateMenu(testProps))
    fireEvent.click(disabledElement)
    expect(disabledElement).not.toHaveClass('b-menu-item--active')
    expect(testProps.onSelect).not.toHaveBeenCalled()
  })

  it('should render virtical mode when prop mode is vertical', () => {
    testProps = {
      defaultIndex: '0',
      mode: 'vertical',
    }

    cleanup()
    wrapper = render(generateMenu(testProps))
    menuElement = wrapper.getByTestId('menu')
    expect(menuElement).toHaveClass('b-menu--vertical')
  })

  it('should warn when pass children which are not MenuItem type', () => {
    cleanup()
    console.error = jest.fn()

    wrapper = render(
      <Menu {...testProps}>
        <li>invalid</li>
      </Menu>
    )
    
    expect(console.error).toHaveBeenCalledTimes(1)
  })
})

const generateMenuWithSubMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>
        active
      </MenuItem>
      <MenuItem disabled>
        disabled
      </MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop 1</MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleTag = (): HTMLStyleElement => {
  const styleContext = `
    .b-submenu {
      display: none;
    }
    .b-submenu.b-submenu--opened {
      display: block;
    }
  `
  const style = document.createElement('style')
  style.innerHTML = styleContext
  return style
}

describe('test Menu with subMenu', () => {
  beforeEach(() => {
    testProps = {
      defaultIndex: '0',
      className: 'test',
      onSelect: jest.fn(),
    }
    wrapper = render(generateMenuWithSubMenu(testProps))
    // css files not contain in jest sandbox, append it manually
    wrapper.container.append(createStyleTag())

    menuElement = wrapper.getByTestId('menu')
    activeElement = wrapper.getByText('active')
    disabledElement = wrapper.getByText('disabled')
  })

  it('should render correct Menu, MenuItem and SubMenu by default', () => {
    expect(menuElement.querySelectorAll(':scope > li').length).toEqual(3)
  })

  it('should show & hide dropdown items when mouse enters & leaves', async () => {
    expect(wrapper.queryByText('drop 1')).not.toBeInTheDocument()
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await wait(() => {
      expect(expect(wrapper.queryByText('drop 1')).toBeVisible())
    })

    fireEvent.mouseLeave(dropdownElement)
    await wait(() => {
      expect(expect(wrapper.queryByText('drop 1')).not.toBeVisible())
    })
  })

  it('should trigger onSelect with default index when click on subMenu item', async () => {
    const dropdownElement = wrapper.getByText('dropdown')
    fireEvent.mouseEnter(dropdownElement)
    await wait(() => {
      const dropdownItem = wrapper.getByText('drop 1')
      fireEvent.click(dropdownItem)
      expect(testProps.onSelect).toHaveBeenCalledWith('2-0')
    })
  })
})
