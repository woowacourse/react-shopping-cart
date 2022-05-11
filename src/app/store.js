import { legacy_createStore as createStore } from 'redux';
import rootReducer from 'modules';

const store = createStore(rootReducer);
store.subscribe(() => store.getState());

export default store;
