import styles from './styles.module.scss';
import React from 'react';

interface LoaderProps {
  color?: string;
  size?: number;
  extraClassName?: string;
}

const DEFAULT_COLOR = 'dodgerblue';
const DEFAULT_SIZE = '80px';

const Loader: React.FC<LoaderProps> = ({
  color = DEFAULT_COLOR,
  size = DEFAULT_SIZE,
  extraClassName = '',
}) => {
  return (
    <div
      className={`${styles.loaderContainer} ${extraClassName}`}
    >
      <div
        className={styles.loader}
        style={{
          width: size,
          height: size,
          borderTopColor: color,
          borderLeftColor: color,
        }}
      />
    </div>
  );
};

export default Loader;
