import styles from './styles.module.scss';
import React, { ReactNode } from 'react';

interface ParagraphItemProps {
  title: string;
  description: string | ReactNode;
  extraClassName?: string;
}

const ParagraphItem: React.FC<ParagraphItemProps> = ({
  title, description, extraClassName = '',
}) => {
  return (
    <p className={`${styles.paragraphItem} ${extraClassName}`}>
      <span className={styles.paragraphItemTitle}>
        {title}
      </span>
      {typeof description === 'string' ? (
        <span className={styles.paragraphItemDescription}>
          {description}
        </span>
      ) : description}
    </p>
  );
};

export default ParagraphItem;
