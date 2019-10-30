import React, { Component } from "react";
import {
	Button,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	FormGroup,
	Label,
	Input,
	NavLink
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";

class RegisterModal extends Component {
	state = {
		isOpen: false,
		name: "",
		email: "",
		password: "",
		msg: null
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		register: PropTypes.func.isRequired
	};

	toggle = () => {
		this.setState({ isOpen: !this.state.isOpen });
	};

	onChangeName = e => {
		this.setState({ name: e.target.value });
	};

	onChangeEmail = e => {
		this.setState({ email: e.target.value });
	};

	onChangePassword = e => {
		this.setState({ password: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();
		const { name, email, password } = this.state;
		const newUser = {
			name,
			email,
			password
		};
		this.props.register(newUser);
		this.toggle();
	};

	render() {
		return (
			<div>
				<NavLink href="#" onClick={this.toggle}>
					Register
				</NavLink>
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Register User</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for="username">User Name</Label>
								<Input
									type="text"
									id="username"
									name="username"
									value={this.state.name}
									onChange={this.onChangeName}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="email">Email :</Label>
								<Input
									type="text"
									id="email"
									name="email"
									value={this.state.email}
									onChange={this.onChangeEmail}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="password">Password :</Label>
								<Input
									type="text"
									id="password"
									name="password"
									value={this.state.password}
									onChange={this.onChangePassword}
								/>
							</FormGroup>
							<Button type="submit" color="primary">
								Submit
							</Button>
						</Form>
					</ModalBody>
				</Modal>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated,
	error: state.error
});

export default connect(
	mapStateToProps,
	{ register }
)(RegisterModal);
