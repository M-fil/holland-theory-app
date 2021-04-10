import './styles.scss';
import React, { useContext, useMemo } from 'react';

import { StoreContext } from '../../../../core/store';
import { OccupationColors } from '../../../../core/constants/occupation';

interface LinksListProps {
  colors?: { [props: string]: string };
}

const LinksList: React.FC<LinksListProps> = ({
  colors = OccupationColors,
}) => {
  const { results } = useContext(StoreContext).state;
  const resultsList = useMemo(() => Object.entries(results), [results]);

  return (
    <div className='results-links'>
      {resultsList.map(([occupationKey, resultValue]) => (
        <div
          key={occupationKey}
          className='results-links__link result-link-item'
          style={{
            backgroundColor: colors[occupationKey],
          }}
        >
          <span className='result-link-item__text'>
            {occupationKey}
          </span>
          <span className='result-link-item__number'>
            {resultValue}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LinksList;
