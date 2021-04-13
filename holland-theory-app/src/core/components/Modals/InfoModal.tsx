import './styles.scss';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import ButtonItem from '../ButtonItem';

interface InfoModalProps {
  extraContainerClassName?: string;
  title: string;
  description: ReactNode | string;
  overlayBackground?: string;
  buttonsBlock?: ReactNode;
  closeModal?: () => void;
  isVisible: boolean;
}

const DEFAULT_OVERLAY_COLOR = 'rgba(255, 255, 255, 0.6)';
const mockFn = () => {};

const InfoModal: React.FC<InfoModalProps> = ({
  extraContainerClassName, title, description,
  overlayBackground = DEFAULT_OVERLAY_COLOR,
  buttonsBlock, closeModal = mockFn, isVisible,
}) => {
  const [t] = useTranslation();
  const isDescriptionString = useMemo(() => typeof description === 'string', [description]);

  const onConfirmButtonClick = useCallback(() => {
    if (closeModal) {
      closeModal();
    }
  }, [closeModal]);

  return (
    <div
      className={`info-modal-overlay ${isVisible ? 'visible' : ''}`}
      style={{
        backgroundColor: overlayBackground,
      }}
    >
      <div
        className={`info-modal ${extraContainerClassName} ${isVisible ? 'visible' : ''}`}
      >
        <div className='info-modal__wrapper'>
          <h3 className='info-modal__title'>
            {title}
          </h3>
          {isDescriptionString ? (
            <span className='info-modal__description'>
              {description}
            </span>
          ) : description}
        </div>
        {buttonsBlock || (
          <div className='info-modal__buttons-block'>
            <ButtonItem
              title={t('info-modal.confirm-button')}
              onClick={onConfirmButtonClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoModal;
