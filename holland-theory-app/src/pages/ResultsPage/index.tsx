import './styles.scss';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { SectionIndexes } from '../../core/constants/sections';
import { StoreContext } from '../../core/store';

import JobSelectionModule from '../../modules/JobSelectionModule';
import ResultsModule from '../../modules/ResultsModule';
import ButtonsBlock from '../../core/components/ButtonsBlock';
import CareersListModule from '../../modules/CareersListModule';
import { JobZoneEntity, OccupationCategoryDescription } from '../../core/interfaces/jobs';
import * as JobService from '../../core/services/jobs';
import MainWrapper from '../../core/components/MainWrapper';
import RestartTestModule from '../../modules/RestartTestModule';

const ResultsPage: React.FC = () => {
  const { resultsSections, results, selectedJobZone } = useContext(StoreContext).state;
  const currentSectionIndex = useMemo(() => resultsSections.currentSectionIndex, [resultsSections.currentSectionIndex]);
  const [
    occupationCategoriesDescriptions, setOccupationCategoriesDescriptions,
  ] = useState<OccupationCategoryDescription[]>([]);
  const [jobZones, setJobZones] = useState<JobZoneEntity[]>([]);

  useEffect(() => {
    const getAllData = async () => {
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
      case SectionIndexes.CareersList:
        return (
          <CareersListModule />
        );
      case SectionIndexes.RestartTest:
        return (
          <RestartTestModule />
        );
    }
  }, [currentSectionIndex, occupationCategoriesDescriptions, jobZones]);

  return (
    <MainWrapper
      buttonBlock={(
        <ButtonsBlock />
      )}
    >
      {renderSpecificBlock()}
    </MainWrapper>
  );
};

export default ResultsPage;
