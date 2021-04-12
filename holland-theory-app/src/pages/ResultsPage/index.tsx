import './styles.scss';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SectionIndexes } from '../../core/constants/sections';
import { StoreContext } from '../../core/store';

import JobSelectionModule from '../../modules/JobSelectionModule';
import ResultsModule from '../../modules/ResultsModule';
import ButtonsBlock from '../../core/components/ButtonsBlock';
import { JobZoneEntity, OccupationCategoryDescription } from '../../core/interfaces/jobs';
import * as JobService from '../../core/services/jobs';

const ResultsPage: React.FC = () => {
  const { resultsSections, results, selectedJobZone } = useContext(StoreContext).state;
  const currentSectionIndex = useMemo(() => resultsSections.currentSectionIndex, [resultsSections.currentSectionIndex]);
  const [
    occupationCategoriesDescriptions, setOccupationCategoriesDescriptions,
  ] = useState<OccupationCategoryDescription[]>([]);
  const [jobZones, setJobZones] = useState<JobZoneEntity[]>([]);

  useEffect(() => {
    const getAllData = async () => {
      await JobService.getJobsByJobZoneAndOccupationCategories(results, selectedJobZone);
      const occupationDate = await JobService.getOccupationCategoriesDescriptions();
      const jobZonesData = await JobService.getAllJobZones();

      if (occupationDate) {
        setOccupationCategoriesDescriptions(occupationDate);
      }
      if (jobZonesData) {
        setJobZones(jobZonesData);
      }
    };

    getAllData();
  }, [results, selectedJobZone]);

  const renderSpecificBlock = useCallback(() => {
    switch (currentSectionIndex) {
      case SectionIndexes.Results:
      default:
        return (
          <ResultsModule
            occupationCategoriesDescriptions={occupationCategoriesDescriptions}
          />
        );
      case SectionIndexes.JobZones:
        return (
          <JobSelectionModule
            jobZones={jobZones}
          />
        );
    }
  }, [currentSectionIndex, occupationCategoriesDescriptions, jobZones]);

  return (
    <div className='results-page'>
      <div className='results-page__wrapper'>
        <div className='results-page__main-block'>
          <div className='results-page__content'>
            {renderSpecificBlock()}
          </div>
          <ButtonsBlock />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
