import { useState, useEffect } from 'react';

import { requestTable } from '../api/request';

export default (defaultValue, schema, { activateLoading, deactivateLoading }) => {
  const [value, setValue] = useState(defaultValue);

  const getAllData = async () => {
    try {
      activateLoading();
      const data = await requestTable.GET(schema);
      setValue(data);
    } catch (error) {
      console.error(error);
      setValue(defaultValue);
    } finally {
      deactivateLoading();
    }
  };

  const getData = async targetId => {
    try {
      activateLoading();
      const data = await requestTable.GET(schema, targetId);

      return data;
    } catch (error) {
      console.error(error);
    } finally {
      deactivateLoading();
    }
  };

  const putData = async (targetId, content) => {
    try {
      activateLoading();
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
    } finally {
      deactivateLoading();
    }
  };

  const postData = async content => {
    try {
      activateLoading();
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
    } finally {
      deactivateLoading();
    }
  };

  useEffect(() => {
    getAllData();

    return () => setValue(defaultValue);
  }, []);

  return { value, setValue, getAllData, getData, putData, postData };
};
