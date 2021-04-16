import './styles.scss';
import React, { useCallback, useContext, useEffect, useState, MouseEvent, useMemo } from 'react';

import * as JobService from '../../core/services/jobs';
import { StoreContext } from '../../core/store';
import CareerItem from './components/CareerItem';
import * as ResultsActions from '../../core/store/actions/results';
import CareerInfoModal from './components/CareerInfoModal';
import Loader from '../../core/components/Loader';

const CareersListModule: React.FC = () => {
  const { results, selectedJobZone, resultCareers: careers } = useContext(StoreContext).state;
  const { dispatch } = useContext(StoreContext);
  const [selectedCareerIndex, setSelectedCareerIndex] = useState<number>(0);
  const [isModalInfoVisible, setIsModalInfoVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedCareer = useMemo(() => careers && careers[selectedCareerIndex], [careers, selectedCareerIndex]);

  useEffect(() => {
    const getCareers = async () => {
      setIsLoading(true);
      if (selectedJobZone > 0 && careers.length === 0) {
        const careersData = await JobService.getJobsByJobZoneAndOccupationCategories(results, selectedJobZone);

        if (Array.isArray(careersData)) {
          dispatch(ResultsActions.setFinalCareers(careersData));
        }
      }

      setIsLoading(false);
    };

    getCareers();
  }, [selectedJobZone, results, dispatch, careers]);

  const onClickCareerItem = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target) as HTMLDivElement;
    const targetElement = target.closest('[data-career-code]') as HTMLDivElement;

    if (targetElement) {
      const codeValue = targetElement.dataset.careerCode;
      const targetCareerIndex = careers.findIndex((career) => career.code === codeValue);

      if (targetCareerIndex >= 0) {
        setIsModalInfoVisible(true);
        setSelectedCareerIndex(targetCareerIndex);
      }
    }
  }, [careers]);

  const closeInfoModal = useCallback(() => {
    setIsModalInfoVisible(false);
  }, []);

  return (
    <div
      className='careers-list'
      onClick={onClickCareerItem}
    >
      {isLoading && <Loader />}
      {selectedCareer && (
        <CareerInfoModal
          isVisible={isModalInfoVisible}
          closeModal={closeInfoModal}
          title={selectedCareer.title}
          alsoCalled={selectedCareer.also_called.title}
          fit={selectedCareer.fit}
          tasks={selectedCareer.on_the_job.task}
          whatTheyDoText={selectedCareer.what_they_do}
        />
      )}
      <div className='careers-list__wrapper'>
        {careers.map((career, index) => (
          <CareerItem
            key={career.code}
            code={career.code}
            positionInList={index + 1}
            title={career.title}
            description={career.what_they_do}
            fit={career.fit}
            extraClassName='careers-list__item'
          />
        ))}
      </div>
    </div>
  );
};

export default CareersListModule;
