import { createContext, SetStateAction } from 'react';
import { State, initialState } from './reducer';

export interface StoreContextObject {
  dispatch: SetStateAction<any>;
  state: State;
}

export const StoreContext = createContext<StoreContextObject>({
  dispatch: () => {},
  state: initialState,
});
