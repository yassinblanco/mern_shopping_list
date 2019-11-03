import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

const DeleteButton = ({ auth, id }) => {
	return auth ? (
		<Button
			color="danger"
			size="sm"
			className="mr-2"
			onClick={() => this.props.deleteItem(id)}
		>
			&times;
		</Button>
	) : null;
};

class ShoppingList extends Component {
	componentDidMount() {
		this.props.getItems();
	}

	render() {
		const { items } = this.props.item;

		return (
			<Container>
				<ListGroup>
					<TransitionGroup className="shoppong-list">
						{items.map(({ _id, name }) => {
							return (
								<CSSTransition key={_id} timeout={500} classNames="fade">
									<ListGroupItem>
										<DeleteButton
											auth={this.props.auth.isAuthenticated}
											id={_id}
										/>
										{name}
									</ListGroupItem>
								</CSSTransition>
							);
						})}
					</TransitionGroup>
				</ListGroup>
			</Container>
		);
	}
}

ShoppingList.propTypes = {
	getItems: PropTypes.func.isRequired,
	item: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	item: state.item,
	auth: state.auth
});

export default connect(
	mapStateToProps,
	{ getItems, deleteItem }
)(ShoppingList);
