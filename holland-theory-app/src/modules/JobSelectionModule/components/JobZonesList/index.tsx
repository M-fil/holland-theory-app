import './styles.scss';
import React, { MouseEvent, useCallback } from 'react';

import { JobZoneEntity } from '../../../../core/interfaces/jobs';
import JobZoneItem from './components/JobZoneItem';

interface JobZonesListProps {
  jobZones: JobZoneEntity[];
  onJobZoneClick: (jobZoneValue: number) => void;
}

const JobZonesList: React.FC<JobZonesListProps> = ({
  jobZones, onJobZoneClick,
}) => {
  const onJobZoneClickHandler = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target) as HTMLDivElement;
    const targetElement = target.closest('[data-job-zone-value]') as HTMLDivElement;

    if (targetElement) {
      const jobZoneValue = Number(targetElement.dataset.jobZoneValue);
      onJobZoneClick(jobZoneValue);
    }
  }, [onJobZoneClick]);

  return (
    <div
      className='job-zones-list'
      onClick={onJobZoneClickHandler}
    >
      {jobZones.map((jobZone) => (
        <JobZoneItem
          key={jobZone.value}
          value={jobZone.value}
          tooltipText={jobZone.education}
          title={jobZone.title}
        />
      ))}
    </div>
  );
};

export default JobZonesList;
