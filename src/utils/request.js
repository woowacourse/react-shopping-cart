
const request = async (url, option = {}) => {
  try {
    const res = await fetch(url, option);
    const body = await res.json();
    
    if (!res.ok) {
      throw new Error(`http request Error : ${res.status}`);
    }
    
    return body;
  } catch (error) {
    throw new Error(`http request Error : ${error}`);
  }
};

export default request