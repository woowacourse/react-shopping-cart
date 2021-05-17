import { useState, useEffect } from 'react';
import { requestTable } from '../api/request';

export default (defaultValue, type) => {
  const [value, setValue] = useState(defaultValue);

  const getAllData = async () => {
    try {
      const data = await requestTable.GET(type);
      setValue(data || []);
    } catch (error) {
      console.error(error);
      setValue(defaultValue);
    }
  };

  const getData = async targetId => {
    try {
      const data = await requestTable.GET(type, targetId);
      console.log('a', data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const putData = async (targetId, content) => {
    try {
      await requestTable.PUT(type, targetId, content);

      setValue(prevState => {
        const newState = prevState.filter(state => state.id !== targetId);

        newState.push({
          id: targetId,
          ...content,
        });
        return newState;
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postData = async content => {
    try {
      const newDataId = await requestTable.POST(type, content);

      setValue(prevState => {
        const newState = [...prevState];
        newState.push({
          id: newDataId,
          ...content,
        });

        return newState;
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllData();

    return () => setValue(defaultValue);
  }, []);

  return { value, setValue, getAllData, getData, putData, postData };
};
