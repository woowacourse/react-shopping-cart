interface handlerTypes {
  [key: string]: (state: any, action: object) => {};
}

export default function createReducer<T>(
  initialState: T,
  handlers: handlerTypes
) {
  return function reducer(state = initialState, action: any) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
