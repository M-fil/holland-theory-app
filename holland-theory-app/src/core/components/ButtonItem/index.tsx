import React, { HTMLAttributes, MouseEvent } from 'react';
import styles from './styles.module.scss';

interface ButtonItemProps {
  title: string | HTMLElement;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  otherButtonProps?: HTMLAttributes<HTMLButtonElement>;
  extraClassName?: string;
}

const ButtonItem: React.FC<ButtonItemProps> = ({
  title, onClick, otherButtonProps = {},
  extraClassName = '',
}) => {
  return (
    <button
      type='button'
      className={`${styles.buttonItem} ${extraClassName}`}
      onClick={onClick}
      {...otherButtonProps}
    >
      {title}
    </button>
  );
};

export default ButtonItem;
