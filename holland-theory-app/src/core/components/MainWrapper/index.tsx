import styles from './styles.module.scss';
import React, { ReactNode } from 'react';

interface MainWrapperProps {
  children?: ReactNode;
  buttonBlock?: ReactNode;
  extraClassName?: string;
}

const MainWrapper: React.FC<MainWrapperProps> = ({
  children = null, buttonBlock = null, extraClassName = '',
}) => {
  return (
    <div className={`${styles.mainContainer} ${extraClassName}`}>
      <div className={styles.mainContainerWrapper}>
        <div className={styles.mainBlock}>
          <div className={styles.contentBlock}>
            {children}
          </div>
          {buttonBlock}
        </div>
      </div>
    </div>
  );
};

export default MainWrapper;
