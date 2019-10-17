import React, {Component} from 'react';
import {Navbar,Container, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink} from 'reactstrap';


class AppNavbar extends Component{
    state = {
        collapsed: false
    }

    toggleNavbar = () => this.setState({collapsed: !this.state.collapsed});

    render(){
        return(
            <Navbar color="secondary" expand="sm" dark className="mb-5">
                <Container> 
                    <NavbarBrand href="/" className="mr-auto">ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2"/>
                    <Collapse isOpen={this.state.collapsed} navbar>
                        <Nav navbar className="ml-auto">
                            <NavItem>
                                <NavLink href="/components/">Components</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                 </Container>
            </Navbar>
        );
    }
}

export default AppNavbar;