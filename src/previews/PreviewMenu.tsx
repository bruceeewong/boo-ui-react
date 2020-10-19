import React from 'react';
import Menu from '../components/Menu/menu'
import MenuItem from '../components/Menu/menuItem'
import SubMenu from '../components/Menu/subMenu'

function PreviewButton() {
  return (
    <div>
      <h3>Menu</h3>
      <Menu defaultIndex={0} onSelect={(index) => { console.log(index) }}>
        <MenuItem index={0}>
          Item 1
        </MenuItem>
        <MenuItem index={1} disabled>
          Item 2
        </MenuItem>
        <SubMenu index={2} title="dropdown">
          <MenuItem index={3}>
            Item 1
          </MenuItem>
          <MenuItem index={4} disabled={true}>
            Item 2
          </MenuItem>
        </SubMenu>
      </Menu>
      <hr/>

      <h3>Vertical Menu</h3>
      <Menu mode="vertical" defaultIndex={0} onSelect={(index) => { console.log(index) }}>
        <MenuItem index={0}>
          Item 1
        </MenuItem>
        <MenuItem index={1} disabled={true}>
          Item 2
        </MenuItem>
        <SubMenu index={2} title="dropdown">
          <MenuItem index={3}>
            Item 1
          </MenuItem>
          <MenuItem index={4} disabled={true}>
            Item 2
          </MenuItem>
        </SubMenu>
      </Menu>
      <hr/>
    </div>
  );
}

export default PreviewButton;
