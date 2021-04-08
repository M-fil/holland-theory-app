import React from 'react';
import { I18nextProvider } from 'react-i18next';

import i18n from './core/i18n';
import MainPage from './pages/Main';

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <MainPage />
    </I18nextProvider>
  );
}

export default App;
