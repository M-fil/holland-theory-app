import './styles.scss';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { DEVELOPER_GITHUB_LINK } from '../../core/constants/urls';

const FooterModule: React.FC = () => {
  const [t] = useTranslation();

  return (
    <footer className='footer-module'>
      <h4 className='footer-module__developer-name'>
        {t('developer-name')}
      </h4>
      <a
        href={DEVELOPER_GITHUB_LINK}
        className='footer-module__link'
        target='_blank'
        rel='noreferrer'
      >
        {t('github-link-text')}
      </a>
    </footer>
  );
};

export default FooterModule;
