import React, { useState,useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProp {
  index?: number;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProp> = (props) => {
  const {
    index,
    title,
    className,
    children,
  } = props

  const [menuOpen, setMenuOpen] = useState(false)
  const context = useContext(MenuContext)

  const classes = classNames(
    'b-menu-item',
    'b-menu-item-submenu',
    {
      'b-submenu-item--active': index === context.index,
    },
    className,
  )

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(!menuOpen)
  }

  let timer: any = null
  const handleMouseEvent = (e: React.MouseEvent, toggle: boolean) => {
    e.preventDefault()

    clearTimeout(timer)
    timer = setTimeout(() => {
      setMenuOpen(toggle)
    }, 100)
  }

  const renderChildren = () => {
    const subMenuClasses = classNames(
      'b-submenu',
      { 'b-submenu--opened': menuOpen },
    )

    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.error('Warning: SubMenu has a child which is not MenuItem type')
      }
    })

    return (
      <ul className={subMenuClasses}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li
      className={classes}
      onMouseEnter={e => { context.mode === 'horizontal' && handleMouseEvent(e, true)}}
      onMouseLeave={e => { context.mode === 'horizontal' && handleMouseEvent(e, false)}}
    >
      <div 
        className="b-submenu-title" 
        onClick={e => handleOpen(e)}
      >
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu