import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';


const Navbar = (props) => {
  return (
    <div>
      <Nav>
        <NavItem>
          <NavLink href="#">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">Submit Reports</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">View Trails</NavLink>
        </NavItem>
        <NavItem>
          <NavLink disabled href="#">Logout</NavLink>
        </NavItem>
      </Nav>
      <hr />


    </div>
  );
}

export default Navbar;
