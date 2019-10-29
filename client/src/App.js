import React, { Component } from "react";
import "./App.css";
import { Container } from "reactstrap";
import Navbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";

class App extends Component {
	render() {
		return (
			<div className="App">
				<Navbar />
				<Container>
					<ItemModal />
				</Container>
				<ShoppingList />
			</div>
		);
	}
}

export default App;
