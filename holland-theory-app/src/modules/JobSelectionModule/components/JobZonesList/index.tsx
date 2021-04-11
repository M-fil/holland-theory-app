import './styles.scss';
import React, { MouseEvent, useCallback } from 'react';
import { JobZoneEntity } from '../../../../core/interfaces/jobs';

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
        <div
          key={String(jobZone.value)}
          className='job-zone-item job-zones-list__item'
          title={jobZone.education}
          data-job-zone-value={jobZone.value}
        >
          <span className='job-zone-item__title'>
            {jobZone.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default JobZonesList;
