import axios from 'axios';

const getResult = async (execute) => {
  try {
    const res = await execute();

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getApi = async (endPoint) => getResult(async () => axios.get(`/${endPoint}`));

export const postApi = async (endPoint, data = {}) =>
  getResult(async () => axios.post(`/${endPoint}`, data));

export const putApi = async (endPoint, data = {}) =>
  getResult(async () => axios.put(`/${endPoint}`, data));

export const deleteApi = async (endPoint, data = {}) =>
  getResult(async () => axios.delete(`/${endPoint}`, data));
