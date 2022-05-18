import axios from 'axios';

const client = async (endPoint) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.get(`http://localhost:4000/${endPoint}`, config);

    return res.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export default client;
