import { Circle, Group, Path, Skia, TileMode } from '@shopify/react-native-skia';
import React from 'react';
import { SharedValue, useDerivedValue } from 'react-native-reanimated';

interface CursorProps {
  cx: SharedValue<number>;
  cy: SharedValue<number>;
  chartHeight: number;
}

export function Cursor({ cx, cy, chartHeight }: CursorProps) {
  const dotted = useDerivedValue(() => {
    const p = Skia.Path.Make();
    p.moveTo(0, 0);
    p.lineTo(0, chartHeight - 20 - cy.value);
    p.dash(10, 12, 0);

    const m = Skia.Matrix();
    m.translate(cx.value, cy.value);
    p.transform(m);

    return p;
  });

  const bg = useDerivedValue(() => {
    const w = 70;
    const h = chartHeight; // altura do gradiente a partir do cursor até o fundo

    const rPath = Skia.Path.Make();
    rPath.addRRect({
      rect: { x: 0, y: 0, width: w, height: h },
      rx: 50,
      ry: 50,
    });

    // move o retângulo para posição real (x centralizado, y = cy.value)
    const m = Skia.Matrix();
    m.translate(cx.value - w / 2, cy.value - 35);
    rPath.transform(m);

    // shader vertical agora de cima (cursor) até o fundo
    const colors = [Skia.Color('#E8FBFD'), Skia.Color('rgba(101,212,225,0.45)'), Skia.Color('rgba(101,212,225,0)')];
    const positions = [0, 0.3, 1];

    const shader = Skia.Shader.MakeLinearGradient(
      Skia.Point(0, 0),
      Skia.Point(0, h),
      colors,
      positions,
      TileMode.Clamp,
    );

    const paint = Skia.Paint();
    paint.setAntiAlias(true);
    paint.setShader(shader);

    return { path: rPath, paint };
  });

  return (
    <Group>
      <Path path={bg.value.path} paint={bg.value.paint} />

      <Path path={dotted.value} color="white" style="stroke" strokeWidth={3} strokeCap="round" />

      <Circle cx={cx.value} cy={cy.value} r={27} color="rgba(255,255,255,0.4)" />

      <Circle cx={cx.value} cy={cy.value} r={18} color="white" />

      <Circle cx={cx.value} cy={cy.value} r={9} color="#65D4E1" />
    </Group>
  );
}
