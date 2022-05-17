import axios from 'axios';

const client = async (endPoint) => {
  const config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  const res = await axios.get(`http://localhost:4000/${endPoint}`, config);

  if (res.statusText !== 'OK') {
    throw new Error();
  }

  return res.data;
};

export default client;
