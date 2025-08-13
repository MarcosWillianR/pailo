import { Path, Skia } from '@shopify/react-native-skia';
import { useDerivedValue } from 'react-native-reanimated';

interface DottedLineProps {
  cx: number;
  cy: number;
  chartHeight: number;
  current: boolean;
}

export function DottedLine({ cx, cy, chartHeight, current }: DottedLineProps) {
  // linha pontilhada (path relativo, depois traduzido)
  const dotted = useDerivedValue(() => {
    const p = Skia.Path.Make();
    p.moveTo(0, 15);
    // desce até o fundo do gráfico (ajuste -20 se quiser espaçamento do bottom)
    p.lineTo(0, chartHeight);
    p.dash(10, 12, 0);

    // traduz para a posição real do cursor
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
