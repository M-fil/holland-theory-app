import React, { useCallback, useEffect, useMemo, useState } from 'react';

import * as JobService from '../../core/services/jobs';
import { JobZoneEntity } from '../../core/interfaces/jobs';
import JobZoneInfoModal from './components/JobZoneInfoModal';

const JobSelectionModule: React.FC = () => {
  const [jobZones, setJobZones] = useState<JobZoneEntity[]>([]);
  const [targetJobZoneIndex] = useState<number>(0);
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

  return (
    <div className='job-selection'>
      <JobZoneInfoModal
        isVisible={isInfoModalVisible}
        closeModal={onCloseInfoModal}
        jobZone={targetJobZone}
      />
    </div>
  );
};

export default JobSelectionModule;
