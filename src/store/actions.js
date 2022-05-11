import axios from 'axios';
import { SERVER_URL } from '../constants';

const loadActionGenerator = (type, payload) => ({ type, payload });

// eslint-disable-next-line import/prefer-default-export
export const load = (path, type) => async (dispatch) => {
  const { data } = await axios.get(`${SERVER_URL}/${path}`);
  dispatch(loadActionGenerator(type, data));
};
