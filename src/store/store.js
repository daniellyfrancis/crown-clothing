import { compose, createStore, applyWiddleware } from 'redux';
import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const middleWares = [logger];

const composedEnhancers = compose(applyWiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);

