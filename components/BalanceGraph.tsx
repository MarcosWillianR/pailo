import { DataType } from '@/data/data';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { curveBasis, line, scaleLinear, scalePoint } from 'd3';
import { useEffect } from 'react';
import { useSharedValue, withTiming } from 'react-native-reanimated';

interface BalanceGrapProps {
  data: DataType[];
  chartHeight: number;
  chartMargin: number;
  chartWidth: number;
}

export function BalanceGraph({ data, chartHeight, chartMargin, chartWidth }: BalanceGrapProps) {
  const animationLine = useSharedValue(0);

  useEffect(() => {
    animationLine.value = withTiming(1, { duration: 1000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const xDomain = data.map((dataPoint: DataType) => dataPoint.label);

  const xRange = [chartMargin, chartWidth - chartMargin];

  const x = scalePoint().domain(xDomain).range(xRange).padding(0);

  const max = Math.max(...data.map((val) => val.value));
  const min = Math.min(...data.map((val) => val.value));

  const yDomain = [min, max];

  const yRange = [chartHeight, 0];

  const y = scaleLinear().domain(yDomain).range(yRange);

  const curvedLine = line<DataType>()
    .x((d) => x(d.label)!)
    .y((d) => y(d.value))
    .curve(curveBasis)(data);

  const linePath = Skia.Path.MakeFromSVGString(curvedLine!);

  return (
    <Canvas style={{ width: chartWidth, height: chartHeight, backgroundColor: 'black' }}>
      <Path
        path={linePath!}
        style="stroke"
        strokeWidth={4}
        color="#EAF984"
        strokeCap="round"
        start={0}
        end={animationLine}
      />
    </Canvas>
  );
}
