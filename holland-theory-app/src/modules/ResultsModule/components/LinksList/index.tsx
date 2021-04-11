import './styles.scss';
import React, { useContext, useMemo, MouseEvent, useCallback } from 'react';

import { StoreContext } from '../../../../core/store';
import { OccupationCategories, getOccupationColors } from '../../../../core/constants/occupation';
import { ResultsContext } from '../../constants/context';
import * as ColorsUtils from '../../../../core/utils/colors';

interface LinksListProps {
  colors?: { [props: string]: string };
  opacity?: string;
  activeOpacity?: string;
  onClickLinkItem?: (occupationKey?: OccupationCategories) => void;
}

const DEFAULT_OPACITY = '0.6';
const DEFAULT_ACTIVE_OPACITY = '1.0';
const mockFn = () => {};

const LinksList: React.FC<LinksListProps> = ({
  opacity = DEFAULT_OPACITY,
  activeOpacity = DEFAULT_ACTIVE_OPACITY,
  colors = getOccupationColors(activeOpacity),
  onClickLinkItem = mockFn,
}) => {
  const { highlightedColor, setHighlightedColor } = useContext(ResultsContext);
  const { results } = useContext(StoreContext).state;
  const resultsList = useMemo(() => Object.entries(results), [results]);

  const compareRGBAValues = useCallback((color1: string, color2: string): boolean => {
    return ColorsUtils.compareRGBAValues(color1, color2, opacity, activeOpacity);
  }, [opacity, activeOpacity]);

  const changeHighlightedColor = useCallback((value: OccupationCategories | null) => {
    if (highlightedColor !== value) {
      setHighlightedColor(value);
    }
  }, [highlightedColor, setHighlightedColor]);

  const handleMouseOver = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target) as HTMLDivElement;
    const targetElement = target.closest('[data-occupation-color]') as HTMLDivElement;

    if (targetElement) {
      const targetColor = targetElement.dataset.occupationColor;
      changeHighlightedColor(targetColor as OccupationCategories);
    }
  }, [changeHighlightedColor]);

  const handleMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target) as HTMLDivElement;
    const targetElement = target.closest('[data-occupation-color]') as HTMLDivElement;

    if (targetElement) {
      changeHighlightedColor(null);
    }
  }, [changeHighlightedColor]);

  const onItemLinkClickHandler = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const targetElement = target.closest('[data-occupation-key]') as HTMLDivElement;

    if (targetElement) {
      const occupationKey = targetElement.dataset.occupationKey;
      onClickLinkItem(occupationKey as OccupationCategories);
    }
  }, [onClickLinkItem]);

  return (
    <div
      className='results-links'
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      onClick={onItemLinkClickHandler}
    >
      {resultsList.map(([occupationKey, resultValue]) => (
        <div
          key={occupationKey}
          className='results-links__link result-link-item'
          data-occupation-color={colors[occupationKey]}
          data-occupation-key={occupationKey}
          style={{
            backgroundColor: colors[occupationKey],
            opacity: compareRGBAValues(highlightedColor as string, colors[occupationKey])
              ? activeOpacity
              : opacity,
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
