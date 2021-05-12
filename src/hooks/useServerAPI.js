import { useState, useEffect } from 'react';

import { requestTable } from '../api/request';
import { activateLoading, deactivateLoading } from '../redux/action';
import { store } from '../redux/store';

export default (defaultValue, schema) => {
  const [value, setValue] = useState(defaultValue);

  const getAllData = async () => {
    try {
      store.dispatch(activateLoading());
      const data = await requestTable.GET(schema);
      setValue(data);
    } catch (error) {
      console.error(error);
      setValue(defaultValue);
    } finally {
      store.dispatch(deactivateLoading());
    }
  };

  const getData = async targetId => {
    try {
      store.dispatch(activateLoading());
      const data = await requestTable.GET(schema, targetId);

      return data;
    } catch (error) {
      console.error(error);
    } finally {
      store.dispatch(deactivateLoading());
    }
  };

  const putData = async (targetId, content) => {
    try {
      store.dispatch(activateLoading());
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
      store.dispatch(deactivateLoading());
    }
  };

  const postData = async content => {
    try {
      store.dispatch(activateLoading());
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
      store.dispatch(deactivateLoading());
    }
  };

  useEffect(() => {
    getAllData();

    return () => setValue(defaultValue);
  }, []);

  return { value, setValue, getAllData, getData, putData, postData };
};
