import { Path, Skia } from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';

interface DottedLineProps {
  cx: number;
  cy: number;
  chartHeight: number;
  current: boolean;
}

export function DottedLine({ cx, cy, chartHeight, current }: DottedLineProps) {
  const dotted = useDerivedValue(() => {
    const p = Skia.Path.Make();
    p.moveTo(0, 0);
    p.lineTo(0, chartHeight - 15 - cy);
    p.dash(10, 12, 0);

    const m = Skia.Matrix();
    m.translate(cx, cy);
    p.transform(m);

    return p;
  });

  return (
    <Path
      path={dotted.value}
      color={current ? 'transparent' : '#EBEDF5'}
      style="stroke"
      strokeWidth={3}
      strokeCap="round"
    />
  );
}
