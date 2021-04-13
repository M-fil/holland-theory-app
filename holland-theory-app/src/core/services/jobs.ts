import { Urls } from '../constants/urls';
import { CareerEntity, CareerLinkEntity } from '../interfaces/careers';
import { JobZoneEntity, OccupationCategoryDescription } from '../interfaces/jobs';
import { onetWebService } from './onet-web';

interface JobZonesQueryResult {
  job_zone: JobZoneEntity[],
}

interface OccupationCategoriesQueryResult {
  result: OccupationCategoryDescription[],
}

interface JobsQueryResult {
  career: CareerLinkEntity[],
}

export const getAllJobZones = async (): Promise<JobZoneEntity[] | null> => {
  try {
    const result = await onetWebService.makeRequest<JobZonesQueryResult>(Urls.JobZones);
    if (result.data) {
      return result.data.job_zone;
    }

    return [];
  } catch {
    return null;
  }
};

export const getOccupationCategoriesDescriptions = async (): Promise<
  OccupationCategoryDescription[] | null
> => {
  try {
    const result = await onetWebService.makeRequest<OccupationCategoriesQueryResult>(
      Urls.OccupationCategoriesDescriptions,
    );
    if (result.data) {
      return result.data.result;
    }

    return [];
  } catch {
    return null;
  }
};

export const getJobsByJobZoneAndOccupationCategories = async (
  results: { [prop: string]: number }, jobZoneValue: number,
): Promise<CareerEntity[] | null> => {
  try {
    const interestsQueryString = Object.entries(results).reduce((acc, cur) => {
      acc += `${cur[0]}=${cur[1]}&`;
      return acc;
    }, '');
    const jobZoneQueryString = `job_zone=${jobZoneValue}`;
    const resultQueryString = `${interestsQueryString}${jobZoneQueryString}`;
    const careersData = await onetWebService.makeRequest<JobsQueryResult>(Urls.CareersByInterests, resultQueryString);
    const careerLinks = careersData.data?.career || [];
    const allCareersResult = await Promise.all(
      (careersData.data?.career || []).map((item) => onetWebService.makeRequest<CareerEntity>(item.href, '', true)),
    );
    const allCareers = allCareersResult.map((careerItem, index) => {
      const career = careerItem.data;

      return {
        also_called: career?.also_called,
        fit: careerLinks[index].fit,
        code: career?.code,
        on_the_job: career?.on_the_job,
        resources: career?.resources,
        title: career?.title,
        what_they_do: career?.what_they_do,
      };
    }) as CareerEntity[];

    return allCareers;
  } catch {
    return null;
  }
};
