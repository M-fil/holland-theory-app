import './styles.scss';
import React, { useCallback, useContext } from 'react';
import Checkbox from 'react-custom-checkbox';

import * as ResultActions from '../../../../../../core/store/actions/results';
import { StoreContext } from '../../../../../../core/store';

interface JobZoneItemProps {
  value: number;
  tooltipText?: string;
  title: string;
}

const JobZoneItem: React.FC<JobZoneItemProps> = ({
  value, tooltipText, title,
}) => {
  const { dispatch } = useContext(StoreContext);
  const { selectedJobZone } = useContext(StoreContext).state;

  const onCheckboxValueChange = useCallback((checked: boolean) => {
    const jobZoneIndex = checked ? value : -1;
    dispatch(ResultActions.selectJobZoneAction(jobZoneIndex));
  }, [value, dispatch]);

  return (
    <div
      key={String(value)}
      className='job-zone-item job-zones-list__item'
      title={tooltipText}
    >
      <Checkbox
        className='job-zone-item__checkbox'
        onChange={onCheckboxValueChange}
        checked={selectedJobZone === value}
      />
      <div
        className='job-zone-item__main-content'
        data-job-zone-value={value}
      >
        <span className='job-zone-item__title'>
          {title}
        </span>
      </div>
    </div>
  );
};

export default JobZoneItem;
