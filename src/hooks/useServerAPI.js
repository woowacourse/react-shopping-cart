import { useState, useEffect } from 'react';
import { requestTable } from '../api/request';

export default (defaultValue, schema) => {
  const [value, setValue] = useState(defaultValue);

  const getAllData = async () => {
    try {
      const data = await requestTable.GET(schema);
      setValue(data);
    } catch (error) {
      console.error(error);
      setValue(defaultValue);
    }
  };

  const getData = async targetId => {
    try {
      const data = await requestTable.GET(schema, targetId);

      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const putData = async (targetId, content) => {
    try {
      await requestTable.PUT(schema, targetId, content);

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
      const newDataId = await requestTable.POST(schema, content);

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
