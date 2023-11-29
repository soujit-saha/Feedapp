import AsyncStorage from '@react-native-async-storage/async-storage';
import {call, put, select, takeLatest} from 'redux-saga/effects';
import showAlert from '../../utils/helpers/Toast';
import {fetchFeedFailure, fetchFeedSuccess} from '../reducer/DataReducer';
import {getApi} from '../../utils/helpers/ApiRequest';
import {AxiosResponse} from 'axios';

export function* fetchFeedSaga() {
  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };
  try {
    let response: AxiosResponse = yield call(getApi, 'posts', Header);

    if (response) {
      yield put(fetchFeedSuccess(response.data));
      showAlert('Feed Fetch Successfully');
    } else {
      yield put(fetchFeedFailure(response));
      showAlert('Feed Fetch Falier');
    }
  } catch (error) {
    yield put(fetchFeedFailure(error));
    showAlert('Feed Fetch Falier');
  }
}

const watchFunction = [
  (function* () {
    yield takeLatest('Data/fetchFeedRequest', fetchFeedSaga);
  })(),
];

export default watchFunction;
