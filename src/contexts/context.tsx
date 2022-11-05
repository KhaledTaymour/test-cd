import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import { normalizedDataStructure } from "utils/types";
import {
  initialState,
  reducer,
  reducerFilterStateAction,
  reducerInitialStateAction,
  reducerResetAction,
} from "../reducers/reducer";

const AppContext = createContext<{
  state: {
    data: normalizedDataStructure[];
    filteredData: normalizedDataStructure[];
  };
  dispatch: Dispatch<
    reducerInitialStateAction | reducerFilterStateAction | reducerResetAction
  >;
}>({
  state: initialState,
  dispatch: () => null,
});

type Props = {
  children?: ReactNode;
};
const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
