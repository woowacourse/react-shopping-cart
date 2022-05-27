import axios from 'axios';

const getResult = async (execute) => {
  try {
    const res = await execute();

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getApi = async (endPoint, data = {}) =>
  getResult(() => axios.get(`/${endPoint}`), data);

export const postApi = async (endPoint, data = {}) =>
  getResult(() => axios.post(`/${endPoint}`, data));

export const putApi = async (endPoint, data = {}) =>
  getResult(() => axios.put(`/${endPoint}`, data));

export const deleteApi = async (endPoint, data = {}) =>
  getResult(() => axios.delete(`/${endPoint}`, data));
