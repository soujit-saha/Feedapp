import {configureStore} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import DataReducer from './reducer/DataReducer';
import {logger} from 'redux-logger';
import RootSaga from './reduxSaga/RootSaga';

let sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, logger];

export default configureStore({
  reducer: {
    DataReducer: DataReducer,
  },
  middleware,
});

sagaMiddleware.run(RootSaga);
