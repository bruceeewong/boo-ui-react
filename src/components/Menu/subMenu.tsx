import React, { useState,useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
import { CSSTransition } from 'react-transition-group'
import Icon from '../Icon/icon';

export interface SubMenuProp {
  title: string;
  index?: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProp> = (props) => {
  const {
    index,
    title,
    className,
    children,
  } = props

  const context = useContext(MenuContext)

  const isOpened = (index && context.mode === 'vertical' && context.defaultOpenSubMenus) 
                    ? context.defaultOpenSubMenus.includes(index) 
                    : false

  const [menuOpen, setMenuOpen] = useState(isOpened)

  const classes = classNames(
    'b-menu-item',
    'b-submenu-item',
    {
      'b-submenu-item---active': index === context.index,
      'b-submenu-item--opened': menuOpen,
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

    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        // if not set prop index, then set a default
        if (typeof childElement.props.index === 'undefined') {
          return React.cloneElement(childElement, {
            index: `${index}-${i}`,
          })
        }
        return childElement
      } else {
        console.error('Warning: SubMenu has a child which is not MenuItem type')
      }
    })

    return (
      <CSSTransition
        in={menuOpen}
        timeout={300}
        classNames="zoom-in-top"
        appear
        unmountOnExit
      >
        <ul className={subMenuClasses}>
          {childrenComponent}
        </ul>
      </CSSTransition>
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
        <Icon icon="angle-down" className="b-submenu-arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu