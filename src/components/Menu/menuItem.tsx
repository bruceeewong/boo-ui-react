import React, {useContext} from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = (props) => {
  const {
    index,
    disabled,
    className,
    style,
    children,
  } = props

  const context = useContext(MenuContext)

  const classes = classNames(
    'b-menu-item',
    {
      'b-menu-item--disabled': disabled,
      'b-menu-item--active': index === context.index,
    },
    className,
  )

  const handleSelect = () => {
    if  (context.onSelect 
      && !disabled 
      && typeof index === 'string') {
      context.onSelect(index)
    }
  }

  return (
    <li 
      className={classes}
      style={style}
      onClick={handleSelect}
    >
      {children}
    </li>
  )
}

MenuItem.displayName = 'MenuItem'

export default MenuItem