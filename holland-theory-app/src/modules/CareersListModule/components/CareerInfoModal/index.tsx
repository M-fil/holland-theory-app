import './styles.scss';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import InfoModal from '../../../../core/components/Modals/InfoModal';
import ParagraphItem from '../../../../core/components/ParagraphItem';
import { FitType } from '../../../../core/interfaces/careers';

interface CareerInfoModalProps {
  isVisible: boolean;
  closeModal: () => void;
  title: string;
  alsoCalled: string[];
  fit: FitType;
  tasks: string[];
  whatTheyDoText: string;
}

const CareerInfoModal: React.FC<CareerInfoModalProps> = ({
  isVisible, closeModal, title, fit, alsoCalled, tasks, whatTheyDoText,
}) => {
  const [t] = useTranslation();

  const renderDescription = useCallback(() => {
    const tasksJoinedString = tasks.join(', ');
    const tasksString = tasksJoinedString.slice(0, tasksJoinedString.length - 2);

    return (
      <div>
        <ParagraphItem
          title={t('careers-list.subtitles.tasks')}
          description={tasksString}
        />
        <ParagraphItem
          title={t('careers-list.subtitles.also-called')}
          description={(
            <ul className='career-info-modal__dot-list'>
              {alsoCalled.map((text) => (
                <li key={text}>
                  {text}
                </li>
              ))}
            </ul>
          )}
        />
        <ParagraphItem
          title={t('careers-list.subtitles.fit')}
          description={fit}
        />
        <ParagraphItem
          title={t('careers-list.subtitles.what-they-do')}
          description={whatTheyDoText}
        />
      </div>
    );
  }, [alsoCalled, fit, t, tasks, whatTheyDoText]);

  return (
    <InfoModal
      extraContainerClassName='career-info-modal'
      isVisible={isVisible}
      closeModal={closeModal}
      title={title}
      description={renderDescription()}
    />
  );
};

export default CareerInfoModal;
