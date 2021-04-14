import styles from './styles.module.scss';
import React, { ReactNode } from 'react';

interface MainWrapperProps {
  children?: ReactNode;
  buttonBlock?: ReactNode;
  extraMainBlockClassName?: string;
  extraContentClassName?: string;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children = null, buttonBlock = null, extraMainBlockClassName = '', extraContentClassName = '',
}) => {
  return (
    <div className={`${styles.mainContainer}`}>
      <div className={styles.mainContainerWrapper}>
        <div className={`${styles.mainBlock} ${extraMainBlockClassName}`}>
          <div className={`${styles.contentBlock} ${extraContentClassName}`}>
            {children}
          </div>
          {buttonBlock}
        </div>
      </div>
    </div>
  );
};

export default MainWrapper;
