import React, { useMemo, useContext, useCallback, MouseEvent } from 'react';
import { Chart, Pies, Transform } from 'rumble-charts';

import { StoreContext } from '../../../../core/store';
import { OccupationColors } from '../../../../core/constants/occupation';

const DEFAULT_PIE_OPACITY = '0.8';
const DEFAULT_PIE_ACTIVE_OPACITY = '1';
const DEFAULT_PIE_WIDTH = 600;
const DEFAULT_PIE_HEIGHT = 250;

interface ChartBlockProps {
  opacity?: string,
  activeOpacity?: string,
  width?: number,
  height?: number,
  colors?: string[],
}

const ChartBlock: React.FC<ChartBlockProps> = ({
  opacity = DEFAULT_PIE_OPACITY,
  activeOpacity = DEFAULT_PIE_ACTIVE_OPACITY,
  width = DEFAULT_PIE_HEIGHT,
  height = DEFAULT_PIE_WIDTH,
  colors = Object.values(OccupationColors),
}) => {
  const { results } = useContext(StoreContext).state;
  const series = useMemo(() => ([
    {
      data: Object.values(results),
    }
  ]), [results]);

  const changePieOpacity = useCallback((event: MouseEvent<HTMLDivElement>, value: string) => {
    const target = (event.target as HTMLDivElement);
    target.style.opacity = value;
  }, []);

  const onPieChartMouseMove = useCallback((event: MouseEvent<HTMLDivElement>) => {
    changePieOpacity(event, activeOpacity);
  }, [activeOpacity, changePieOpacity]);

  const onPieChartMouseLeave = useCallback((event: MouseEvent<HTMLDivElement>) => {
    changePieOpacity(event, opacity);
  }, [opacity, changePieOpacity]);

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
          pieStyle={{
            opacity,
          }}
          colors={colors}
        />
      </Transform>
    </Chart>
  );
};

export default ChartBlock;
