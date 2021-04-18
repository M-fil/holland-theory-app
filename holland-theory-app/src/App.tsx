import React, { useEffect, useMemo, useReducer } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from './core/i18n';
import MainPage from './pages/MainPage';
import { initialState, mainReducer, State, storageHandler } from './core/store/reducer';
import { StorageKeys } from './core/constants/storage';
import { StoreContext } from './core/store';

const stateFromStorage = storageHandler.getValue<State>(StorageKeys.StateKey);

const App: React.FC = () => {
  const [state, dispatch] = useReducer(mainReducer, stateFromStorage || initialState);
  const contextValue = useMemo(() => ({
    state, dispatch,
  }), [state, dispatch]);

  useEffect(() => {
    if (state.nextQuestionIndex > 1) {
      storageHandler.saveValue<State>(StorageKeys.StateKey, state);
    }
  }, [state]);

  return (
    <StoreContext.Provider value={contextValue}>
      <I18nextProvider i18n={i18n}>
        <MainPage />
      </I18nextProvider>
    </StoreContext.Provider>
  );
};

export default App;
