import React from "react";
import { Nav, NavLink, NavMenu } from "./NavbarElements";

class Navbar extends React.Component {

    render() {
        return(
            <>
             <Nav>
                 <NavMenu>
                    <NavLink to="/AccountCreationForm" activeStyle>
                        Register
                    </NavLink>
                 </NavMenu>
             </Nav>
            </>
        );
    }
}

export default Navbar;