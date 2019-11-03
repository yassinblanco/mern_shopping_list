import React, { Component } from "react";
import "./App.css";
import { Container } from "reactstrap";
import Navbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class App extends Component {
	static propTypes = {
		auth: PropTypes.object.isRequired
	};
	render() {
		const addButton = this.props.auth.isAuthenticated ? (
			<Container>
				<ItemModal />
			</Container>
		) : null;
		return (
			<div className="App">
				<Navbar />
				{addButton}
				<ShoppingList />
			</div>
		);
	}
}

const mapStateToProps = state => ({
	auth: state.auth
});

export default connect(
	mapStateToProps,
	null
)(App);
