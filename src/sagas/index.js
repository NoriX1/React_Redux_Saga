import usersSagas from './users';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
	yield all([...usersSagas]);	//same function as Promise.all(...), but in redux-sagas
}