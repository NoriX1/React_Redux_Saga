import React from 'react';
import { connect } from 'react-redux';
import { getUsersRequest, createUserRequest, deleteUserRequest, usersError } from '../actions/users';
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';
import { Alert } from 'reactstrap';

class App extends React.Component {

	componentDidMount() {
		this.props.getUsersRequest();
	}

	handleSubmit = ({ firstName, lastName }) => {
		this.props.createUserRequest({ firstName, lastName });
	};

	handleDeleteUserClick = (userId) => {
		this.props.deleteUserRequest(userId);
	};

	handleCloseAlert = () => {
		this.props.usersError({ error: '' });
	}


	render() {
		return (
			<div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
				<Alert color="danger" isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
					{this.props.users.error}
				</Alert>
				<NewUserForm onSubmit={this.handleSubmit} />
				<UsersList onDeleteUser={this.handleDeleteUserClick} users={this.props.users.items} />
			</div>
		);
	}
}

const mapStateToProps = state => {
	return { users: state.users };
}

export default connect(mapStateToProps, {
	getUsersRequest,
	createUserRequest,
	deleteUserRequest,
	usersError
})(App);	