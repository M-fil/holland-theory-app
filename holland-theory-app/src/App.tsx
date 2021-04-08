import React, { useMemo, useReducer } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from './core/i18n';
import MainPage from './pages/Main';
import { StoreContext } from './core/store';
import { initialState, mainReducer } from './core/store/reducer';

const App: React.FC = () => {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const contextValue = useMemo(() => ({
    state, dispatch,
  }), [state, dispatch]);

  return (
    <StoreContext.Provider value={contextValue}>
      <I18nextProvider i18n={i18n}>
        <MainPage />
      </I18nextProvider>
    </StoreContext.Provider>
  );
}

export default App;
