import {all} from 'redux-saga/effects';
import DataSaga from './DataSaga';

const combinedSaga = [...DataSaga];

export default function* RootSaga() {
  yield all(combinedSaga);
}
