import './styles.scss';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import * as JobService from '../../core/services/jobs';
import { JobZoneEntity } from '../../core/interfaces/jobs';
import JobZoneInfoModal from './components/JobZoneInfoModal';
import JobZonesList from './components/JobZonesList';

const JobSelectionModule: React.FC = () => {
  const [t] = useTranslation();
  const [jobZones, setJobZones] = useState<JobZoneEntity[]>([]);
  const [targetJobZoneIndex, setTargetJobZoneIndex] = useState<number>(0);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState<boolean>(true);
  const targetJobZone = useMemo(() => jobZones && jobZones[targetJobZoneIndex], [jobZones, targetJobZoneIndex]);

  useEffect(() => {
    const getJobZones = async () => {
      const jobZonesData = await JobService.getAllJobZones();
      if (jobZonesData) {
        setJobZones(jobZonesData);
      }
    };

    getJobZones();
  }, []);

  const onCloseInfoModal = useCallback(() => {
    setIsInfoModalVisible(false);
  }, []);

  const onJobZoneClick = useCallback((jobZoneValue: number) => {
    const targetIndex = jobZones.findIndex((jobZone) => jobZone.value === jobZoneValue);
    if (targetIndex >= 0) {
      setIsInfoModalVisible(true);
      setTargetJobZoneIndex(targetIndex);
    }
  }, [jobZones]);

  return (
    <div className='job-selection'>
      <JobZoneInfoModal
        isVisible={isInfoModalVisible}
        closeModal={onCloseInfoModal}
        jobZone={targetJobZone}
      />
      <div className='job-selection__wrapper'>
        <div className='job-selection__info-block'>
          {t('job-selection.job-zones-tutorial')}
        </div>
        <JobZonesList
          jobZones={jobZones}
          onJobZoneClick={onJobZoneClick}
        />
      </div>
    </div>
  );
};

export default JobSelectionModule;
