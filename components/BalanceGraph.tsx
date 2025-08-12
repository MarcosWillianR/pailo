import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { curveBasis, line, scaleLinear, scalePoint } from 'd3';
import { useEffect, useState } from 'react';
import { Gesture, GestureDetector, PanGestureHandlerEventPayload } from 'react-native-gesture-handler';
import { clamp, runOnJS, SharedValue, useSharedValue, withDelay, withTiming } from 'react-native-reanimated';
import { getYForX, parse } from 'react-native-redash';

import { DataType } from '@/data/data';

import { Cursor } from './Cursor';
import { Gradient } from './Gradient';
import { XAxisText } from './XAxisText';

interface BalanceGrapProps {
  data: DataType[];
  chartHeight: number;
  chartMargin: number;
  chartWidth: number;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  selectedValue: SharedValue<number>;
}

export function BalanceGraph({
  data,
  chartHeight,
  chartMargin,
  chartWidth,
  setSelectedDate,
  selectedValue,
}: BalanceGrapProps) {
  const [showCursor, setShowCursor] = useState(false);
  const animationLine = useSharedValue(0);
  const animationGradient = useSharedValue({ x: 0, y: 0 });
  const cx = useSharedValue(0);
  const cy = useSharedValue(0);
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    animationLine.value = withTiming(1, { duration: 1000 });
    animationGradient.value = withDelay(1000, withTiming({ x: 0, y: chartHeight }, { duration: 500 }));
    selectedValue.value = withTiming(totalValue, { duration: 1000 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const xDomain = data.map((dataPoint: DataType) => dataPoint.label);

  const xRange = [chartMargin, chartWidth - chartMargin];

  const x = scalePoint().domain(xDomain).range(xRange).padding(0);

  const stepX = x.step();

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

  const path = parse(linePath!.toSVGString());

  const handleGestureEvent = (e: PanGestureHandlerEventPayload) => {
    'worklet';

    const index = Math.floor(e.absoluteX / stepX);

    runOnJS(setSelectedDate)(data[index].date);
    selectedValue.value = withTiming(data[index].value);

    const clampValue = clamp(
      Math.floor(e.absoluteX / stepX) * stepX + chartMargin,
      chartMargin,
      chartWidth - chartMargin,
    );
    cx.value = clampValue;
    cy.value = getYForX(path, Math.floor(clampValue))!;
  };

  const pan = Gesture.Pan()
    .onTouchesDown(() => {
      runOnJS(setShowCursor)(true);
    })
    .onTouchesUp(() => {
      runOnJS(setShowCursor)(false);
      runOnJS(setSelectedDate)('Total');
      selectedValue.value = withTiming(totalValue);
    })
    .onBegin(handleGestureEvent)
    .onChange(handleGestureEvent);

  return (
    <GestureDetector gesture={pan}>
      <Canvas style={{ width: chartWidth, height: chartHeight }}>
        <Path
          path={linePath!}
          style="stroke"
          strokeWidth={4}
          color="#30B5C5"
          strokeCap="round"
          start={0}
          end={animationLine}
        />

        <Gradient
          chartHeight={chartHeight}
          chartWidth={chartWidth}
          chartMargin={chartMargin}
          curvedLine={curvedLine!}
          animationGradient={animationGradient}
        />

        {data.map((dataPoint, index) => (
          <XAxisText x={x(dataPoint.label)!} y={chartHeight} text={dataPoint.label} key={index} />
        ))}

        {/* {showCursor && <Cursor cx={cx} cy={cy} chartHeight={chartHeight} />} */}
        <Cursor cx={cx} cy={cy} chartHeight={chartHeight} />
      </Canvas>
    </GestureDetector>
  );
}
