import './styles.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

const HeaderModule: React.FC = () => {
  const [t] = useTranslation();

  return (
    <header className='header-module'>
      <h1 className='header-module__title'>
        {t('main-title')}
      </h1>
    </header>
  );
};

export default HeaderModule;
