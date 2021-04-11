import React, { useMemo, useContext, useCallback, MouseEvent } from 'react';
import { Chart, Pies, Transform } from 'rumble-charts';

import { StoreContext } from '../../../../core/store';
import { OccupationCategories, getOccupationColors } from '../../../../core/constants/occupation';
import { ResultsContext } from '../../constants/context';
import * as ColorsUtils from '../../../../core/utils/colors';

const DEFAULT_PIE_OPACITY = '0.6';
const DEFAULT_PIE_ACTIVE_OPACITY = '1.0';
const DEFAULT_PIE_WIDTH = 400;
const DEFAULT_PIE_HEIGHT = 200;

interface ChartBlockProps {
  opacity?: string;
  activeOpacity?: string;
  width?: number;
  height?: number;
  colors?: string[];
  activeColors?: string[];
}

const ChartBlock: React.FC<ChartBlockProps> = ({
  opacity = DEFAULT_PIE_OPACITY,
  activeOpacity = DEFAULT_PIE_ACTIVE_OPACITY,
  width = DEFAULT_PIE_HEIGHT,
  height = DEFAULT_PIE_WIDTH,
  colors = Object.values(getOccupationColors(opacity)),
  activeColors = Object.values(getOccupationColors(activeOpacity)),
}) => {
  const { setHighlightedColor, highlightedColor } = useContext(ResultsContext);
  const { results } = useContext(StoreContext).state;
  const series = useMemo(() => ([
    {
      data: Object.values(results),
    }
  ]), [results]);

  const compareRGBAValues = useCallback((color1: string, color2: string): boolean => {
    return ColorsUtils.compareRGBAValues(color1, color2, opacity, activeOpacity);
  }, [opacity, activeOpacity]);

  const targetColors = useMemo(() => {
    const targetHighlightedColor = colors.findIndex((color) => compareRGBAValues(color, highlightedColor as string));
    if (targetHighlightedColor >= 0) {
      return colors.map((color, index) => targetHighlightedColor === index
        ? activeColors[targetHighlightedColor]
        : color,
      );
    }

    return colors;
  }, [highlightedColor, colors, activeColors, compareRGBAValues]);

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
            onMouseLeave: onPieChartMouseLeave
          }}
          colors={targetColors}
        />
      </Transform>
    </Chart>
  );
};

export default ChartBlock;
