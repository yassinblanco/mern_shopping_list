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
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class LoginModal extends Component {
	state = {
		isOpen: false,
		email: "",
		password: "",
		msg: null
	};

	static propTypes = {
		isAuthenticated: PropTypes.bool,
		error: PropTypes.object.isRequired,
		login: PropTypes.func.isRequired,
		clearErrors: PropTypes.func.isRequired
	};

	componentDidUpdate(prevProps) {
		const { error, isAuthenticated } = this.props;
		if (error !== prevProps.error) {
			// Check for register error
			if (error.id === "LOGIN_FAIL") {
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

	onChangeEmail = e => {
		this.setState({ email: e.target.value });
	};

	onChangePassword = e => {
		this.setState({ password: e.target.value });
	};

	onSubmit = e => {
		e.preventDefault();

		const { email, password } = this.state;

		const user = {
			email,
			password
		};

		this.props.login(user);
	};

	render() {
		return (
			<div>
				<NavLink href="#" onClick={this.toggle}>
					Login
				</NavLink>
				<Modal isOpen={this.state.isOpen} toggle={this.toggle}>
					<ModalHeader toggle={this.toggle}>Login</ModalHeader>
					<ModalBody>
						{this.state.msg ? (
							<Alert color="danger">{this.state.msg}</Alert>
						) : null}
						<Form onSubmit={this.onSubmit}>
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
	{ login, clearErrors }
)(LoginModal);
