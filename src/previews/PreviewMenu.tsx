import React from 'react';
import Menu from '../components/Menu/menu'
import MenuItem from '../components/Menu/menuItem'
import SubMenu from '../components/Menu/subMenu'

function PreviewButton() {
  return (
    <div>
      <h3>Menu</h3>
      <Menu onSelect={(index) => { console.log(index) }}>
        <MenuItem>
          Item 1
        </MenuItem>
        <MenuItem disabled>
          Item 2
        </MenuItem>
        <SubMenu title="dropdown">
          <MenuItem>
            Item 2-1
          </MenuItem>
          <MenuItem>
            Item 2-2
          </MenuItem>
          <MenuItem disabled={true}>
            Item 2-3
          </MenuItem>
        </SubMenu>
      </Menu>
      <hr/>

      <h3>Vertical Menu</h3>
      <Menu 
        mode="vertical" 
        defaultIndex="contact-wechat" 
        defaultOpenSubMenus={['contact']}
        onSelect={(index) => { console.log(index) }}
      >
        <MenuItem index="home">
          Home
        </MenuItem>
        <MenuItem index="blog">
          Blog
        </MenuItem>
        <MenuItem index="coming" disabled>
          Coming Soon
        </MenuItem>
        <SubMenu index="contact" title="Contact">
          <MenuItem index="contact-wechat">
            Wechat
          </MenuItem>
          <MenuItem index="contact-qq">
            QQ
          </MenuItem>
          <MenuItem index="contact-twitter" disabled={true}>
            Twitter
          </MenuItem>
        </SubMenu>
      </Menu>
      <hr/>
    </div>
  );
}

export default PreviewButton;
