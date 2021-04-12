import './styles.scss';
import React, { useCallback, useContext, useEffect, useState, MouseEvent, useMemo } from 'react';

import { CareerEntity } from '../../core/interfaces/careers';
import * as JobService from '../../core/services/jobs';
import { StoreContext } from '../../core/store';
import CareerItem from './components/CareerItem';
import InfoModal from '../../core/components/Modals/InfoModal';

const CareersListModule: React.FC = () => {
  const { results, selectedJobZone } = useContext(StoreContext).state;
  const [careers, setCareers] = useState<CareerEntity[]>([]);
  const [selectedCareerIndex, setSelectedCareerIndex] = useState<number>(0);
  const [isModalInfoVisible, setIsModalInfoVisible] = useState<boolean>(false);
  const selectedCareer = useMemo(() => careers && careers[selectedCareerIndex], [careers, selectedCareerIndex]);

  useEffect(() => {
    const getCareers = async () => {
      if (selectedJobZone > 0) {
        const careersData = await JobService.getJobsByJobZoneAndOccupationCategories(results, selectedJobZone);

        if (Array.isArray(careersData)) {
          setCareers(careersData);
        }
      }
    };

    getCareers();
  }, [selectedJobZone,  results]);

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
      <InfoModal
        isVisible={isModalInfoVisible}
        closeModal={closeInfoModal}
        title={selectedCareer?.title}
        description={selectedCareer?.what_they_do}
      />
      <div className='careers-list__wrapper'>
        {careers.map((career) => (
          <CareerItem
            key={career.code}
            code={career.code}
            title={career.title}
            description={career.what_they_do}
            isGreetFit={career.fit === 'Great'}
            extraClassName='careers-list__item'
          />
        ))}
      </div>
    </div>
  );
};

export default CareersListModule;
