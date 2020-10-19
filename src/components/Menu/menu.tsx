import React , { useState }from 'react'
import classNames from 'classnames'

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
  index: number;
  onSelect?: SelectCallback;
}

export const MenuContext = React.createContext<IMenuContext>({
  index: 0,
})

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
    {'b-menu--vertical': mode === MenuMode.VERTICAL},
    className,
  )

  const handleSelect = (index: number) => {
    setActiveIdx(index)
    
    onSelect && onSelect(index)
  }

  const passedContext: IMenuContext = {
    index: activeIdx ? activeIdx : 0,
    onSelect: handleSelect,
  }

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: MenuMode.HORIZONTAL,
}

export default Menu