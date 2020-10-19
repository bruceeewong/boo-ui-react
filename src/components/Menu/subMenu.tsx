import React, { useContext } from 'react'
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

  const context = useContext(MenuContext)

  const classes = classNames(
    'b-menu-item',
    'b-submenu-item',
    {
      'b-submenu-item--active': index === context.index,
    },
    className,
  )

  const renderChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      if (childElement.type.displayName === 'MenuItem') {
        return childElement
      } else {
        console.error('Warning: SubMenu has a child which is not MenuItem type')
      }
    })

    return (
      <ul className="b-submenu">
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes}>
      <div className="b-submenu-title">
        {title}
      </div>
      {renderChildren()}
    </li>
  )
}

SubMenu.displayName = 'SubMenu'
export default SubMenu