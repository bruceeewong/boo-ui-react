import React , { useState }from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type MenuModeProp = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void
export enum MenuMode {
  HORIZONTAL = 'horizontal',
  VERTICAL = 'vertical',
}

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuModeProp;
  style?: React.CSSProperties;
  onSelect?: SelectCallback;
}

interface IMenuContext {
  index?: number;
  mode?: MenuModeProp,
  onSelect?: SelectCallback;
}

export const MenuContext = React.createContext<IMenuContext>({})

const Menu: React.FC<MenuProps> = (props) => {
  const {
    mode,
    defaultIndex,
    style,
    className,
    children,
    onSelect,
  } =  props

  const [activeIdx, setActiveIdx] = useState(defaultIndex)

  const classes = classNames(
    'b-menu',
    {'b-menu--horizontal': mode === MenuMode.HORIZONTAL},
    {'b-menu--vertical': mode === MenuMode.VERTICAL},
    className,
  )

  const handleSelect = (index: number) => {
    setActiveIdx(index)
    
    if (onSelect) {
      onSelect(index)
    }
  }

  const passedContext: IMenuContext = {
    index: activeIdx ? activeIdx : 0,
    mode,
    onSelect: handleSelect,
  }

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return child
      } else {
        console.error('Warning: Menu has a child which is not MenuItem type')
        return
      }
    })
  }

  return (
    <ul className={classes} style={style} data-testid="menu">
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: MenuMode.HORIZONTAL,
}

export default Menu