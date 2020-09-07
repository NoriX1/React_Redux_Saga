import React from 'react';
import { ListGroup, ListGroupItem, Button } from 'reactstrap';

const UsersList = ({ users, onDeleteUser }) => {
	const sortUsers = (users) => {
		return users.sort((a, b) => {
			if (a.firstName > b.firstName) {
				return 1;
			} else if (a.firstName < b.firstName) {
				return -1;
			} else if (a.lastName > b.lastName) {
				return 1;
			} else if (a.lastName < b.lastName) {
				return -1;
			} else {
				return 0;
			}
		});
	}

	const renderList = (users) => {
		return users.map(user => {
			return (
				<ListGroupItem key={user.id}>
					<section style={{ display: 'flex' }}>
						<div style={{ flexGrow: 1, margin: 'auto 0' }}>
							{`${user.firstName} ${user.lastName}`}
						</div>
						<div>
							<Button outline color="danger" onClick={() => onDeleteUser(user.id)} >
								Delete
							</Button>
						</div>
					</section>
				</ListGroupItem>
			);
		});
	}

	return (
		<ListGroup>
			{renderList(sortUsers(users))}
		</ListGroup>
	);
};

export default UsersList;