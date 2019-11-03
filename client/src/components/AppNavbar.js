import React, { Component } from "react";
import {
	Navbar,
	Container,
	NavbarBrand,
	NavbarToggler,
	Collapse,
	Nav,
	NavItem
} from "reactstrap";
import RegisterModal from "./auth/RegisterModal";
import Login from "./auth/LoginModal";
import Logout from "./auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AppNavbar extends Component {
	state = {
		collapsed: false
	};

	static propTypes = {
		auth: PropTypes.object.isRequired
	};

	toggleNavbar = () => this.setState({ collapsed: !this.state.collapsed });

	render() {
		const Item = (
			<NavItem>
				{this.props.auth.token === null ? <Login /> : <Logout />}
			</NavItem>
		);
		return (
			<Navbar color="secondary" expand="sm" dark className="mb-5">
				<Container>
					<NavbarBrand href="/" className="mr-auto">
						ShoppingList
					</NavbarBrand>
					<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
					<Collapse isOpen={this.state.collapsed} navbar>
						<Nav navbar className="ml-auto">
							<NavItem>
								<RegisterModal />
							</NavItem>
							{Item}
						</Nav>
					</Collapse>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	null
)(AppNavbar);
