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
	NavLink,
	Alert
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

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
		register: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			// Check for register error
			if (error.id === "REGISTER_FAIL") {
				this.setState({ msg: error.msg.msg });
			} else {
				this.setState({ msg: null });
			}
		}

		// If authenticated, close modal
		if (this.state.isOpen) {
			if (isAuthenticated) {
				this.toggle();
			}
		}
	}

	toggle = () => {
		this.props.clearErrors();
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
		//this.toggle();
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
						{this.state.msg ? (
							<Alert color="danger">{this.state.msg}</Alert>
						) : null}
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
									type="email"
									id="email"
									name="email"
									value={this.state.email}
									onChange={this.onChangeEmail}
								/>
							</FormGroup>
							<FormGroup>
								<Label for="password">Password :</Label>
								<Input
									type="password"
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
	{ register, clearErrors }
)(RegisterModal);
