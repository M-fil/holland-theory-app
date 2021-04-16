import './styles.scss';
import React, { useCallback, useContext } from 'react';
import { useTranslation } from 'react-i18next';

import ButtonItem from '../../core/components/ButtonItem';
import { storageHandler } from '../../core/store/reducer';
import { StorageKeys } from '../../core/constants/storage';
import * as ResultsActions from '../../core/store/actions/results';
import { StoreContext } from '../../core/store';

const RestartTestModule: React.FC = () => {
  const [t] = useTranslation();
  const { dispatch } = useContext(StoreContext);

  const onRestartTest = useCallback(() => {
    storageHandler.saveValue<null>(StorageKeys.StateKey, null);
    dispatch(ResultsActions.restartTestAction());
  }, [dispatch]);

  return (
    <div className='restart-test-module'>
      <h4 className='restart-test-module__text'>
        {t('results-page.thanks-for-test-passing')}
      </h4>
      <ButtonItem
        title={t('results-page.restart-test')}
        onClick={onRestartTest}
      />
    </div>
  );
};

export default RestartTestModule;
