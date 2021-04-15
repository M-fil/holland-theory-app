import React, { useMemo, useContext, useCallback, MouseEvent } from 'react';
import { Chart, Pies, Transform } from 'rumble-charts';

import { StoreContext } from '../../../../core/store';
import { OccupationCategories, getOccupationColors } from '../../../../core/constants/occupation';
import { ResultsContext } from '../../constants/context';
import * as ColorsUtils from '../../../../core/utils/colors';

const DEFAULT_PIE_OPACITY = '0.6';
const DEFAULT_PIE_ACTIVE_OPACITY = '1.0';
const DEFAULT_PIE_WIDTH = 200;
const DEFAULT_PIE_HEIGHT = 200;

interface ChartBlockProps {
  opacity?: string;
  activeOpacity?: string;
  width?: number;
  height?: number;
  colors?: [string, string][];
  activeColors?: string[];
  onClickPieSection?: (occupationKey?: OccupationCategories) => void;
}

const mockFn = () => {};

const ChartBlock: React.FC<ChartBlockProps> = ({
  opacity = DEFAULT_PIE_OPACITY,
  activeOpacity = DEFAULT_PIE_ACTIVE_OPACITY,
  width = DEFAULT_PIE_HEIGHT,
  height = DEFAULT_PIE_WIDTH,
  colors = Object.entries(getOccupationColors(opacity)),
  activeColors = Object.values(getOccupationColors(activeOpacity)),
  onClickPieSection = mockFn,
}) => {
  const { setHighlightedColor, highlightedColor } = useContext(ResultsContext);
  const { results } = useContext(StoreContext).state;
  const series = useMemo(() => ([
    {
      data: Object.values(results),
    }
  ]), [results]);
  const colorsValues = useMemo(() => colors.map((item) => item[1]), [colors]);

  const compareRGBAValues = useCallback((color1: string, color2: string): boolean => {
    return ColorsUtils.compareRGBAValues(color1, color2, opacity, activeOpacity);
  }, [opacity, activeOpacity]);

  const targetColors = useMemo(() => {
    const targetHighlightedColor = colorsValues.findIndex((color) => compareRGBAValues(color, highlightedColor as string));
    if (targetHighlightedColor >= 0) {
      return colorsValues.map((color, index) => targetHighlightedColor === index
        ? activeColors[targetHighlightedColor]
        : color,
      );
    }

    return colorsValues;
  }, [highlightedColor, colorsValues, activeColors, compareRGBAValues]);

  const changeHighlightedColor = useCallback((target: HTMLDivElement, customValue?: OccupationCategories | null) => {
    if (typeof customValue !== 'undefined') {
      setHighlightedColor(customValue);
    } else {
      const targetColor = target.getAttribute('fill');
      if (highlightedColor !== targetColor) {
        setHighlightedColor(targetColor as OccupationCategories);
      }
    }
  }, [highlightedColor, setHighlightedColor]);

  const onPieChartMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLDivElement);
    changeHighlightedColor(target);
  }, [changeHighlightedColor]);

  const onPieChartMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLDivElement);
    changeHighlightedColor(target, null);
  }, [changeHighlightedColor]);

  const onPieChartSectionClick = useCallback((event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target) {
      const targetColor = target.getAttribute('fill') as string;
      const result = colors.find((item) => compareRGBAValues(item[1], targetColor));
      if (result) {
        const occupationCategory = result[0] as OccupationCategories;
        onClickPieSection(occupationCategory);
      }
    }
  }, [colors, compareRGBAValues, onClickPieSection]);

  return (
    <Chart
      width={width}
      height={height}
      series={series}
    >
      <Transform method={['transpose', 'stack']}>
        <Pies
          combined={true}
          pieAttributes={{
            onMouseMove: onPieChartMouseMove,
            onMouseLeave: onPieChartMouseLeave,
            onClick: onPieChartSectionClick,
          }}
          colors={targetColors}
        />
      </Transform>
    </Chart>
  );
};

export default ChartBlock;
