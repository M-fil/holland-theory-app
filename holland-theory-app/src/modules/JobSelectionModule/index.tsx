import React, { useEffect, useState } from 'react';

import * as JobService from '../../core/services/jobs';
import InfoModal from '../../core/components/Modals/InfoModal';
import { JobZoneEntity } from '../../core/interfaces/jobs';

const JobSelectionModule: React.FC = () => {
  const [jobZones, setJobZones] = useState<JobZoneEntity[]>([]);
  const firstItem = jobZones && jobZones[0];

  useEffect(() => {
    const getJobZones = async () => {
      const jobZonesData = await JobService.getAllJobZones();
      if (jobZonesData) {
        setJobZones(jobZonesData);
      }
    };

    getJobZones();
  }, []);

  return (
    <div className='job-selection'>
      <InfoModal
        isVisible
        title={firstItem?.title}
        description={firstItem?.education}
      />
    </div>
  );
};

export default JobSelectionModule;
