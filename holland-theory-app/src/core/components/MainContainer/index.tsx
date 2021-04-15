import styles from './styles.module.scss';
import React, { ReactNode } from 'react';

interface MainContainerProps {
  extraClassName?: string;
  extraWrapperClassName?: string;
  children?: ReactNode;
}

const MainContainer: React.FC<MainContainerProps> = ({
  extraClassName = '', children, extraWrapperClassName = '',
}) => {
  return (
    <div className={`${styles.mainContainer} ${extraClassName}`}>
      <div className={`${styles.wrapper} ${extraWrapperClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default MainContainer;
