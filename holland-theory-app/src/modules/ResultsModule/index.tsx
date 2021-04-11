import './styles.scss';
import React, { useState, useMemo, useCallback, useEffect } from 'react';

import ChartBlock from './components/Chart';
import LinksList from './components/LinksList';
import { OccupationCategories } from '../../core/constants/occupation';
import { ResultsContext } from './constants/context';
import InfoModal from '../../core/components/Modals/InfoModal';
import * as JobService from '../../core/services/jobs';
import { OccupationCategoryDescription } from '../../core/interfaces/jobs';

const ResultsModule: React.FC = () => {
  const [highlightedColor, setHighlightedColor] = useState<OccupationCategories | null>(null);
  const contextValue = useMemo(() => ({
    highlightedColor,
    setHighlightedColor,
  }), [highlightedColor, setHighlightedColor]);
  const [isModalInfoVisible, setIsModalInfoVisible] = useState<boolean>(false);
  const [
    occupationCategoriesDescriptions, setOccupationCategoriesDescriptions,
  ] = useState<OccupationCategoryDescription[]>([]);
  const [targetOccupationCategoryIndex, setTargetOccupationCategoryIndex] = useState<number>(0);
  const targetOccupationCategory = useMemo(
    () => occupationCategoriesDescriptions && occupationCategoriesDescriptions[targetOccupationCategoryIndex],
    [targetOccupationCategoryIndex, occupationCategoriesDescriptions],
  );

  useEffect(() => {
    const getOccupationCategoriesDescriptions = async () => {
      const result = await JobService.getOccupationCategoriesDescriptions();
      if (result) {
        setOccupationCategoriesDescriptions(result);
      }
    };

    getOccupationCategoriesDescriptions();
  }, []);

  const closeInfoModal = useCallback(() => {
    setIsModalInfoVisible(false);
  }, []);

  const onClickLinkItem = useCallback((occupationKey?: OccupationCategories) => {
    if (occupationKey) {
      const targetIndex = occupationCategoriesDescriptions.findIndex(
        (occupationCategory) => occupationCategory.area === occupationKey,
      );
      if (targetIndex >= 0) {
        setTargetOccupationCategoryIndex(targetIndex);
        setIsModalInfoVisible(true);
      }
    }
  }, [occupationCategoriesDescriptions]);

  return (
    <ResultsContext.Provider value={contextValue}>
      <InfoModal
        isVisible={isModalInfoVisible}
        closeModal={closeInfoModal}
        title={targetOccupationCategory?.area}
        description={targetOccupationCategory?.description}
      />
      <div className='results-module'>
        <div className='results-module__wrapper'>
          <div className='results-module__chart-container'>
            <ChartBlock />
          </div>
          <LinksList onClickLinkItem={onClickLinkItem} />
        </div>
      </div>
    </ResultsContext.Provider>
  );
};

export default ResultsModule;
