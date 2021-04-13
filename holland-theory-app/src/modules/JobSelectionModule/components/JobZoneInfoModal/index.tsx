import React from 'react';
import { useTranslation } from 'react-i18next';

import InfoModal from '../../../../core/components/Modals/InfoModal';
import { JobZoneEntity } from '../../../../core/interfaces/jobs';
import ParagraphItem from '../../../../core/components/ParagraphItem';

interface JobZoneInfoModalProps {
  jobZone: JobZoneEntity;
  isVisible: boolean;
  closeModal: () => void;
}

const JobZoneInfoModal: React.FC<JobZoneInfoModalProps> = ({
  jobZone, isVisible, closeModal
}) => {
  const [t] = useTranslation();

  return (
    <InfoModal
      isVisible={isVisible}
      extraContainerClassName='job-selection-info-modal'
      title={jobZone?.title}
      description={(
        <div className='job-selection-info-modal__description'>
          <ParagraphItem
            title={t('job-selection.subtitles.education')}
            description={jobZone?.education}
          />
          <ParagraphItem
            title={t('job-selection.subtitles.experience')}
            description={jobZone?.experience}
          />
          <ParagraphItem
            title={t('job-selection.subtitles.training')}
            description={jobZone?.job_training}
          />
        </div>
      )}
      closeModal={closeModal}
    />
    );
};

export default JobZoneInfoModal;
