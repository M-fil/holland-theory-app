import { createContext, Dispatch } from 'react';
import { OccupationCategories } from '../../../core/constants/occupation';

export interface ResultsContextObject {
  highlightedColor: OccupationCategories | null,
  setHighlightedColor: Dispatch<OccupationCategories | null>
}

export const ResultsContext = createContext<ResultsContextObject>({
  highlightedColor: null,
  setHighlightedColor: () => {},
});
