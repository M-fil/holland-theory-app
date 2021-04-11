import styles from './styles.module.scss';
import React from 'react';

interface ParagraphItemProps {
  title: string;
  description: string;
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
      <span className={styles.paragraphItemDescription}>
        {description}
      </span>
    </p>
  );
};

export default ParagraphItem;
