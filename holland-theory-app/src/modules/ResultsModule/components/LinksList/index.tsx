import React, { useContext } from 'react';

import { StoreContext } from '../../../../core/store';

const LinksList: React.FC = () => {
  const { results } = useContext(StoreContext).state;

  return (
    <div className="results-module__links">
      {Object.entries(results).map(([occupationKey, resultValue]) => (
        <a
          key={occupationKey}
          href="/"
          className="results-module__link"
        >
          <span className="results-module__link-text">
            {occupationKey}
          </span>
          <span className="results-module__link-number">
            {resultValue}
          </span>
        </a>
      ))}
    </div>
  );
};

export default LinksList;
