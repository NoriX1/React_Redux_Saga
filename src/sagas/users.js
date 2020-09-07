import { takeEvery, takeLatest, take, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

function* getUsers() {
	try {
		const response = yield call(api.getUsers);	//call - call function, and wait for result
		yield put(actions.getUsersSuccess({
			items: response.data.data
		}));
	} catch (e) {
		yield put(actions.usersError({
			error: 'An error occured when trying to fetch the users'
		}));
	}
}

function* createUser(action) {
	try {
		yield call(api.createUser, { firstName: action.payload.firstName, lastName: action.payload.lastName });
		yield call(getUsers);
	} catch (e) {
		yield put(actions.usersError({
			error: 'An error occured when trying to create the user'
		}));
	}
}

function* watchGetUsersRequest() {
	yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

function* watchCreateUserRequest() {
	yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

function* deleteUser({ userId }) {
	try {
		yield call(api.deleteUser, userId);
		yield call(getUsers);
	} catch (e) {
		yield put(actions.usersError({
			error: 'An error occured when trying to delete the user'
		}));
	}
}

function* watchDeleteUserRequest() {
	while (true) {
		const action = yield take(actions.Types.DELETE_USER_REQUEST);
		//Untill request is not resolved - we can`t reach this call one more time
		yield call(deleteUser, { userId: action.payload.userId });
	}
}

const usersSagas = [
	fork(watchGetUsersRequest),
	fork(watchCreateUserRequest),		//fork - run all processes in parallel
	fork(watchDeleteUserRequest)
];

export default usersSagas;